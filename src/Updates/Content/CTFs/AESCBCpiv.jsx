import { useState } from "react";
import Collapsible from "../../../Components/Collapsible";
import CodeSnippet from "../../../Components/CodeSnippet";
import { AESCBCpivServerCode, AESCBCpivSolCode } from "../../Media/CTFCode";
import Latex from "react-latex-next";

const InteractiveEncryption = ({hideMessage, hiddenFlag, className}) => {
    const [plaintext, setPlaintext] = useState("");

    const simpleHash = (seed, string) => {
        const alphabet = " abcdefghijklmnopqrstuvwxyz";
        let number = 0;
        for (let i = 0; i < 8; i++) {
            const characterValue = alphabet.indexOf(string.charAt(i));
            if (characterValue === -1) return undefined;
            number += characterValue * Math.pow(alphabet.length, i);
        }

        number = ((seed + number) * 7546546769875785435454768987525366589634256587876867876898563456768908987675634534567896785566346) % Math.pow(alphabet.length, 8);

        let cypher = "";
        for (let i = 0; i < 8; i++) {
            cypher += alphabet[number % alphabet.length];
            number = Math.floor(number / alphabet.length);
        }

        return cypher;
    }

    const message = plaintext + hiddenFlag;
    const block1 = simpleHash(1, message.slice(0, 8));
    const block2 = simpleHash(2, message.slice(8, 16));
    const block3 = simpleHash(3, message.slice(16, 24));
    const hashed = block1 && block2 && block3 ? block1 + block2 + block3 : "   Invalid character!   ";
    const shownMessage = hideMessage ? plaintext + "????????????????????????" : message;
    return (<div className={className}>
        <p className="pb-2">Message to encrypt: <input type="text" className="bg-opacity-100 bg-background-faded dark:bg-background-faded-dark focus:outline-accent dark:focus:outline-accent-dark border-[1px] rounded-md pl-1" value={plaintext} onChange={e => setPlaintext(e.target.value.toLowerCase().slice(0,24))}/></p>
        <div className="mx-auto overflow-x-auto rounded-lg w-fit max-w-full md:w-full">
            <table className="w-[600px] md:overflow-x-auto md:w-full">
                <colgroup>
                    {Array.from(Array(24).keys()).map( key => {
                        const colour = key > 7 && key < 16 ? "rgba(0,255,0,.5)" : "rgba(0,255,0,.75)";
                        return <col key={key} style={{backgroundColor: colour}} />
                    })}
                </colgroup>
                <tbody>
                    <tr>
                        {Array.from(Array(24).keys()).map( key => {
                            const colour = key >= plaintext.length ? "text-[red]" : "text-[blue]"
                            return <td className={colour + " text-center pt-3 w-[4%]"} key={key} ><b>{shownMessage[key]}</b></td>
                        })}
                    </tr>
                    <tr>
                        {Array.from(Array(21).keys()).map( key => {
                            if ((key + 4) % 7 === 0) {
                                return <td colSpan="2" key={key} className="h-3 text-center">&#8615;</td>
                            } else {
                                return <td className="h-3" key={key} />
                            }
                        })}
                    </tr>
                    <tr>
                        {Array.from(Array(24).keys()).map( key => {
                            return <td key={key} className="text-center pb-3"><b>{hashed[key]}</b></td>
                        })}
                    </tr>
                </tbody>
            </table>
        </div>
    </div>)
}

function Writeup() {

    return (<div>
        <p>
            This puzzle is based off an exploit I used in a competition I took part in. We aren't able to share the puzzles so I created my own exploiting the same vulnerability.
        </p>

        <p className="pt-4 pb-1">
            We are given a server ip address and port to connect to and the servers code:
        </p>

        <Collapsible className="tc mb-4 p-2 bg-background-faded dark:bg-background-faded-dark rounded-md" header={<div className="text-lg font-bold">server.py</div>}>
            <CodeSnippet code={AESCBCpivServerCode}/>
        </Collapsible>

        <p>
            Looking through the code we can see that this is some form of AES encryption service using CBC. We are also given the initial IV when we first connect. This IV is then updated on each encryption and we can work out the new value.
            <br /><br />
            We can also see that there is no information given about the key used which implies that we don't want to try and guess the key and we might be able to work out the flag without the key.
            <br /><br />
            Next it's best to look at how AES CBC works and if we can exploit knowing the IV in advance.
        </p>

        <img className="cc w-full my-2 dark:invert border-[1px] border-text" src="https://upload.wikimedia.org/wikipedia/commons/8/80/CBC_encryption.svg" alt="cbc structure" />

        <p>
            The IV is a random byte string which is used to help randomise the encryption. If you don't use an IV then the same plaintext will encrypt to the same cyphertext each time, allowing you to guess plaintexts until the cyphertexts match.
            <br /><br />
            We can achieve this using the following property of the XOR function:

            <Latex>{`$$\\alpha \\oplus \\beta = 0 \\Leftrightarrow \\alpha = \\beta$$`}</Latex>
            
            If we set the first block of our plaintext to be the IV, then the input to the block cypher encryption will be 0. As the key is constant, this means that the first block of the cyphertext will be constant. This effectively removes the IV as long as we format each message as <b>IV</b> + <b>plaintext</b>.
        </p>
        <p className="py-4">
            This means we can could potentially guess the key (which is found the encryption of 0 matches the output of our first block), however with <Latex>{`$256^{16} \\approx 3.4 \\times 10^{38}$`}</Latex> possible keys, it's likely to take a while.
            <br />
            There are less options for guessing each block of the plaintext as we know the alphabet used (<Latex>{`$27^{16} \\approx 8.0 \\times 10^{22}$`}</Latex>) however we can do better by guessing just one character at a time.
        </p>
        <p>
            As we have control over the start of the encrypted plaintext, we can pad the start of it with <Latex>{`$\\lvert \\text{block} \\rvert - 1$`}</Latex> known letters, and then only have the first character of the plaintext to guess. For example:
        </p>

        <p className="pt-2">
            If we send the following message:<br />
            <b>IV</b> + xxxxxxxxxxxxxxx<br />
            Then the first two block will be the encrypted version of the plaintext will be:
            0000000000000000 + xxxxxxxxxxxxxxx?<br />
            Where <b>?</b> is the unknown character to guess.<br />
            To find <b>?</b> we can start guessing:<br />
            <b>IV</b> + xxxxxxxxxxxxxxxA, <b>IV</b> + xxxxxxxxxxxxxxxB, <b>IV</b> + xxxxxxxxxxxxxxxC ...<br />
            As soon as the second block of ciphertext matches our target we know that our guess was correct and we can move onto the next character.
        </p>

        <p className="py-4">
        Using this method we only have to make at most <Latex>{`$\\lvert \\text{alphabet} \\rvert \\cdot \\lvert \\text{flag} \\rvert$`}</Latex> guesses. This is far smaller then the previous <Latex>{`$\{\\lvert \\text{alphabet} \\rvert}^{\\lvert \\text{block} \\rvert} \\cdot \\lceil \\frac{\\lvert \\text{flag} \\rvert}{\\lvert \\text{block} \\rvert} \\rceil$`}</Latex>. We will use this method to work out what the flag is.
        </p>

        <p className="pt-8">
            I've made an interactive example of how this process works below. It doesn't use the same encryption methods but the same methodology applies. <span className="cc font-bold text-[red]">Red</span> characters are 'unknown' from the flag and <span className="cc font-bold text-[blue]">Blue</span> characters are from your message input. For simplicity the <b>IV</b> is fixed so can be ignored and the block size is 8 rather than the standard 16.
        </p>

        <InteractiveEncryption className="pt-4 pb-8" hiddenFlag={"secure super secret flag"} hideMessage={false}/>

        <p>
            To get an understanding of how this works try entering the following while looking at the output:
            <ul className="list-disc pl-8">
                <li className="font-bold">xxxxxxx</li>
                <li className="font-bold">xxxxxxxs</li>
            </ul>
            And then:
            <ul className="list-disc pl-8">
                <li className="font-bold">xxxxxx</li>
                <li className="font-bold">xxxxxxse</li>
            </ul>
            Without knowing the secret flag you can slowly work out the entire first block just based off the output. This can then be extended to the next block.
            <ul className="list-disc pl-8">
                <li className="font-bold">xxxxxxx</li>
                <li className="font-bold">xxxxxxxsecure su</li>
            </ul>
            This can then be continued until the entire flag is worked out.
        </p>

        <p>
            If you want to try and work this out yourself you can try with a hidden message below. It has a fixed <b>IV</b>, has an alphabet of lowercase letters and space, and is 24 characters long.
        </p>

        <InteractiveEncryption className="pt-4 pb-12" hiddenFlag={"well done for solving it"} hideMessage={true}/>

        <p className="pb-3">
            This process can be automated by a script and I've written one in python that can solve this quite fast. Below is the full code.
        </p>

        <Collapsible className="tc p-2 bg-background-faded dark:bg-background-faded-dark rounded-md" header={<div className="text-lg font-bold">server.py</div>}>
            <CodeSnippet code={AESCBCpivSolCode}/>
        </Collapsible>
    </div>);
}

export default Writeup;