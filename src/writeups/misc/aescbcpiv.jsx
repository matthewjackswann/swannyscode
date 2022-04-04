import React from "react";
import DropDown from "../../DropDown.js"
import { MathComponent } from 'mathjax-react';
import Tex2SVG from "react-hook-mathjax";
import { useState } from 'react';

const InteractiveEncryption = (hidden, hiddenFlag) => {
    const [input, setInput] = useState('');

    const simpleHash = (str) => {
        let result = '';
        for (let i = 0; i < str.length; i++) {
            result += str.charCodeAt(i).toString(16);
        }
        let seed = (s) => {
            return () => {
                s = Math.sin(s) * 10000; return s - Math.floor(s);
            };
        };
        let random = seed(parseInt(result,16) % 2073656372657420500);
        let characters = "abcdefghijklmnopqrstuvwxyz"
        let hash = "";
        for (let i = 0; i < 8; i++) {
            hash += characters.charAt(Math.floor(random() * 26));
        }
        return hash;
      };

    let message = input + hiddenFlag;
    let shownMessage = hidden ? input + "????????????????????????" : message;
    let block1 = simpleHash(message.slice(0, 8));
    let block2 = simpleHash(message.slice(8, 16));
    let block3 = simpleHash(message.slice(16, 24));
    let hashed = block1 + block2 + block3;
    return <div>
        <p>Message to encrypt: <input type="text" value={input} onChange={e => setInput(e.target.value.toLowerCase())}/></p>
        <table style={{borderSpacing: 0}}>
            <colgroup>
                {Array.from(Array(24).keys()).map( key => {
                    const colour = key > 7 && key < 16 ? "rgba(255,0,0,.25)" : "rgba(0,255,0,.25)";
                    return <col key={key} style={{backgroundColor: colour}} />
                    })}
            </colgroup>
            <tbody>
                <tr>
                    {Array.from(Array(24).keys()).map( key => {
                        if (key >= input.length) {
                            return <td key={key} style={{width: "2%", padding: "0px", textAlign: "center"}}><b><span style={{color: "red"}}>{shownMessage[key]}</span></b></td>
                        } else {
                            return <td key={key} style={{width: "2%", padding: "0px", textAlign: "center"}}><b><span style={{color: "blue"}}>{shownMessage[key]}</span></b></td>
                        }
                        })}
                </tr>
                <tr>
                    {Array.from(Array(21).keys()).map( key => {
                            if ((key + 4) % 7 === 0) {
                                return <td colSpan="2" key={key} style={{width: "2%", padding: "0px", textAlign: "center", height: "10px"}}><span>&#8615;</span></td>
                            } else {
                                return <td key={key} style={{width: "2%", padding: "0px", height: "10px"}}></td>
                            }
                        })}
                </tr>
                <tr>
                    {Array.from(Array(24).keys()).map( key => {
                        return <td key={key} style={{width: "2%", padding: "0px", textAlign: "center"}}><b>{hashed[key]}</b></td>
                        })}
                </tr>
            </tbody>
        </table>
    </div>
}

function Component() {    
    return <div>
        <h1>AES CBC with predictable IV</h1><br />
        <p>
            This is a cryptography challenge I came across competing in a competition. We aren't allowed to share
            the question or solution but I enjoyed it so much I made my own version. It is still based of exploiting
            the same vulnerability, the predictable IV.
        </p><br />
        <p>We are given a server ip address and port to connect to and the servers code.</p>
        <DropDown>
            <h4>server.py <i className="arrow down" style={{float: "right", marginRight: "10px"}} /></h4>
            <pre className="code"><code><span style={{display: 'inline-block'}} className="line">
                <span style={{color: 'rgb(166, 38, 164)'}}>import</span><span style={{color: 'rgb(56, 58, 66)'}}> socket</span></span>{"\n"}<span style={{display: 'inline-block'}} className="line">
                <span style={{color: 'rgb(166, 38, 164)'}}>import</span><span style={{color: 'rgb(56, 58, 66)'}}> os</span></span>{"\n"}<span style={{display: 'inline-block'}} className="line">
                <span style={{color: 'rgb(166, 38, 164)'}}>from</span><span style={{color: 'rgb(56, 58, 66)'}}> Crypto.Cipher </span><span style={{color: 'rgb(166, 38, 164)'}}>import</span><span style={{color: 'rgb(56, 58, 66)'}}> AES</span></span>{"\n"}<span style={{display: 'inline-block'}} className="line">
                <span style={{color: 'rgb(56, 58, 66)'}}> </span></span>{"\n"}<span style={{display: 'inline-block'}} className="line">
                <span style={{color: 'rgb(160, 161, 167)', fontStyle: 'italic'}}># A different flag is used in the real server :)</span></span>{"\n"}<span style={{display: 'inline-block'}} className="line">
                <span style={{color: 'rgb(160, 161, 167)', fontStyle: 'italic'}}># the character set is uppercase letters and space.</span></span>{"\n"}<span style={{display: 'inline-block'}} className="line">
                <span style={{color: 'rgb(160, 161, 167)', fontStyle: 'italic'}}># The real one is not necessarily this long.</span></span>{"\n"}<span style={{display: 'inline-block'}} className="line">
                <span style={{color: 'rgb(56, 58, 66)'}}>FLAG </span><span style={{color: 'rgb(166, 38, 164)'}}>=</span><span style={{color: 'rgb(56, 58, 66)'}}> </span><span style={{color: 'rgb(80, 161, 79)'}}>b'THIS IS MY SECRET MESSAGE'</span></span>{"\n"}<span style={{display: 'inline-block'}} className="line">
                <span style={{color: 'rgb(56, 58, 66)'}}> </span></span>{"\n"}<span style={{display: 'inline-block'}} className="line">
                <span style={{color: 'rgb(160, 161, 167)', fontStyle: 'italic'}}># A different encryption key is used in the real server :)</span></span>{"\n"}<span style={{display: 'inline-block'}} className="line">
                <span style={{color: 'rgb(56, 58, 66)'}}>ENCRYPT_KEY </span><span style={{color: 'rgb(166, 38, 164)'}}>=</span><span style={{color: 'rgb(56, 58, 66)'}}> </span><span style={{color: 'rgb(80, 161, 79)'}}>b'ThisIsNotTheSecretKey...'</span></span>{"\n"}<span style={{display: 'inline-block'}} className="line">
                <span style={{color: 'rgb(56, 58, 66)'}}>BLOCK_SIZE </span><span style={{color: 'rgb(166, 38, 164)'}}>=</span><span style={{color: 'rgb(56, 58, 66)'}}> </span><span style={{color: 'rgb(183, 107, 1)'}}>16</span></span>{"\n"}<span style={{display: 'inline-block'}} className="line">
                <span style={{color: 'rgb(56, 58, 66)'}}> </span></span>{"\n"}<span style={{display: 'inline-block'}} className="line">
                <span style={{color: 'rgb(166, 38, 164)'}}>def</span><span style={{color: 'rgb(56, 58, 66)'}}> </span><span style={{color: 'rgb(64, 120, 242)'}}>pad_to_full_block</span><span style={{color: 'rgb(56, 58, 66)'}}>(</span><span style={{color: 'rgb(56, 58, 66)'}}>data</span><span style={{color: 'rgb(56, 58, 66)'}}>):</span></span>{"\n"}<span style={{display: 'inline-block'}} className="line">
                <span style={{color: 'rgb(56, 58, 66)'}}>{"    "}</span><span style={{color: 'rgb(56, 58, 66)'}}>padding_len </span><span style={{color: 'rgb(166, 38, 164)'}}>=</span><span style={{color: 'rgb(56, 58, 66)'}}> BLOCK_SIZE </span><span style={{color: 'rgb(166, 38, 164)'}}>-</span><span style={{color: 'rgb(56, 58, 66)'}}> (</span><span style={{color: 'rgb(1, 132, 188)'}}>len</span><span style={{color: 'rgb(56, 58, 66)'}}>(data) </span><span style={{color: 'rgb(166, 38, 164)'}}>%</span><span style={{color: 'rgb(56, 58, 66)'}}> BLOCK_SIZE)</span></span>{"\n"}<span style={{display: 'inline-block'}} className="line">
                <span style={{color: 'rgb(56, 58, 66)'}}>{"    "}</span><span style={{color: 'rgb(166, 38, 164)'}}>return</span><span style={{color: 'rgb(56, 58, 66)'}}> data </span><span style={{color: 'rgb(166, 38, 164)'}}>+</span><span style={{color: 'rgb(56, 58, 66)'}}> str.</span><span style={{color: 'rgb(64, 120, 242)'}}>encode</span><span style={{color: 'rgb(56, 58, 66)'}}>(</span><span style={{color: 'rgb(1, 132, 188)'}}>chr</span><span style={{color: 'rgb(56, 58, 66)'}}>(padding_len) </span><span style={{color: 'rgb(166, 38, 164)'}}>*</span><span style={{color: 'rgb(56, 58, 66)'}}> padding_len)</span></span>{"\n"}<span style={{display: 'inline-block'}} className="line">
                <span style={{color: 'rgb(56, 58, 66)'}}> </span></span>{"\n"}<span style={{display: 'inline-block'}} className="line">
                <span style={{color: 'rgb(166, 38, 164)'}}>def</span><span style={{color: 'rgb(56, 58, 66)'}}> </span><span style={{color: 'rgb(64, 120, 242)'}}>encrypt</span><span style={{color: 'rgb(56, 58, 66)'}}>(</span><span style={{color: 'rgb(56, 58, 66)'}}>data</span><span style={{color: 'rgb(56, 58, 66)'}}>, </span><span style={{color: 'rgb(56, 58, 66)'}}>iv</span><span style={{color: 'rgb(56, 58, 66)'}}>):</span></span>{"\n"}<span style={{display: 'inline-block'}} className="line">
                <span style={{color: 'rgb(56, 58, 66)'}}>{"    "}</span><span style={{color: 'rgb(56, 58, 66)'}}>aes </span><span style={{color: 'rgb(166, 38, 164)'}}>=</span><span style={{color: 'rgb(56, 58, 66)'}}> AES.</span><span style={{color: 'rgb(64, 120, 242)'}}>new</span><span style={{color: 'rgb(56, 58, 66)'}}>(ENCRYPT_KEY, AES.</span><span style={{color: 'rgb(228, 86, 73)'}}>MODE_CBC</span><span style={{color: 'rgb(56, 58, 66)'}}>, iv)</span></span>{"\n"}<span style={{display: 'inline-block'}} className="line">
                <span style={{color: 'rgb(56, 58, 66)'}}>{"    "}</span><span style={{color: 'rgb(56, 58, 66)'}}>padded </span><span style={{color: 'rgb(166, 38, 164)'}}>=</span><span style={{color: 'rgb(56, 58, 66)'}}> </span><span style={{color: 'rgb(64, 120, 242)'}}>pad_to_full_block</span><span style={{color: 'rgb(56, 58, 66)'}}>(data)</span></span>{"\n"}<span style={{display: 'inline-block'}} className="line">
                <span style={{color: 'rgb(56, 58, 66)'}}>{"    "}</span><span style={{color: 'rgb(166, 38, 164)'}}>return</span><span style={{color: 'rgb(56, 58, 66)'}}> aes.</span><span style={{color: 'rgb(64, 120, 242)'}}>encrypt</span><span style={{color: 'rgb(56, 58, 66)'}}>(</span><span style={{color: 'rgb(64, 120, 242)'}}>pad_to_full_block</span><span style={{color: 'rgb(56, 58, 66)'}}>(data))</span></span>{"\n"}<span style={{display: 'inline-block'}} className="line">
                <span style={{color: 'rgb(56, 58, 66)'}}> </span></span>{"\n"}<span style={{display: 'inline-block'}} className="line">
                <span style={{color: 'rgb(56, 58, 66)'}}>HOST </span><span style={{color: 'rgb(166, 38, 164)'}}>=</span><span style={{color: 'rgb(56, 58, 66)'}}> </span><span style={{color: 'rgb(80, 161, 79)'}}>'127.0.0.1'</span></span>{"\n"}<span style={{display: 'inline-block'}} className="line">
                <span style={{color: 'rgb(56, 58, 66)'}}>PORT </span><span style={{color: 'rgb(166, 38, 164)'}}>=</span><span style={{color: 'rgb(56, 58, 66)'}}> </span><span style={{color: 'rgb(183, 107, 1)'}}>65432</span></span>{"\n"}<span style={{display: 'inline-block'}} className="line">
                <span style={{color: 'rgb(56, 58, 66)'}}> </span></span>{"\n"}<span style={{display: 'inline-block'}} className="line">
                <span style={{color: 'rgb(166, 38, 164)'}}>with</span><span style={{color: 'rgb(56, 58, 66)'}}> socket.</span><span style={{color: 'rgb(64, 120, 242)'}}>socket</span><span style={{color: 'rgb(56, 58, 66)'}}>(socket.</span><span style={{color: 'rgb(228, 86, 73)'}}>AF_INET</span><span style={{color: 'rgb(56, 58, 66)'}}>, socket.</span><span style={{color: 'rgb(228, 86, 73)'}}>SOCK_STREAM</span><span style={{color: 'rgb(56, 58, 66)'}}>) </span><span style={{color: 'rgb(166, 38, 164)'}}>as</span><span style={{color: 'rgb(56, 58, 66)'}}> s:</span></span>{"\n"}<span style={{display: 'inline-block'}} className="line">
                <span style={{color: 'rgb(56, 58, 66)'}}>{"    "}</span><span style={{color: 'rgb(56, 58, 66)'}}>s.</span><span style={{color: 'rgb(64, 120, 242)'}}>bind</span><span style={{color: 'rgb(56, 58, 66)'}}>((HOST, PORT))</span></span>{"\n"}<span style={{display: 'inline-block'}} className="line">
                <span style={{color: 'rgb(56, 58, 66)'}}>{"    "}</span><span style={{color: 'rgb(56, 58, 66)'}}>s.</span><span style={{color: 'rgb(64, 120, 242)'}}>listen</span><span style={{color: 'rgb(56, 58, 66)'}}>()</span></span>{"\n"}<span style={{display: 'inline-block'}} className="line">
                <span style={{color: 'rgb(56, 58, 66)'}}>{"    "}</span><span style={{color: 'rgb(56, 58, 66)'}}>conn, addr </span><span style={{color: 'rgb(166, 38, 164)'}}>=</span><span style={{color: 'rgb(56, 58, 66)'}}> s.</span><span style={{color: 'rgb(64, 120, 242)'}}>accept</span><span style={{color: 'rgb(56, 58, 66)'}}>()</span></span>{"\n"}<span style={{display: 'inline-block'}} className="line">
                <span style={{color: 'rgb(56, 58, 66)'}}>{"    "}</span><span style={{color: 'rgb(166, 38, 164)'}}>with</span><span style={{color: 'rgb(56, 58, 66)'}}> conn:</span></span>{"\n"}<span style={{display: 'inline-block'}} className="line">
                <span style={{color: 'rgb(56, 58, 66)'}}>{"        "}</span><span style={{color: 'rgb(1, 132, 188)'}}>print</span><span style={{color: 'rgb(56, 58, 66)'}}>(</span><span style={{color: 'rgb(80, 161, 79)'}}>'Connected by'</span><span style={{color: 'rgb(56, 58, 66)'}}>, addr)</span></span>{"\n"}<span style={{display: 'inline-block'}} className="line">
                <span style={{color: 'rgb(56, 58, 66)'}}>{"        "}</span><span style={{color: 'rgb(56, 58, 66)'}}>iv </span><span style={{color: 'rgb(166, 38, 164)'}}>=</span><span style={{color: 'rgb(56, 58, 66)'}}> os.</span><span style={{color: 'rgb(64, 120, 242)'}}>urandom</span><span style={{color: 'rgb(56, 58, 66)'}}>(</span><span style={{color: 'rgb(183, 107, 1)'}}>16</span><span style={{color: 'rgb(56, 58, 66)'}}>)</span></span>{"\n"}<span style={{display: 'inline-block'}} className="line">
                <span style={{color: 'rgb(56, 58, 66)'}}>{"        "}</span><span style={{color: 'rgb(56, 58, 66)'}}>conn.</span><span style={{color: 'rgb(64, 120, 242)'}}>sendall</span><span style={{color: 'rgb(56, 58, 66)'}}>(iv)</span></span>{"\n"}<span style={{display: 'inline-block'}} className="line">
                <span style={{color: 'rgb(56, 58, 66)'}}>{"        "}</span><span style={{color: 'rgb(166, 38, 164)'}}>while</span><span style={{color: 'rgb(56, 58, 66)'}}> </span><span style={{color: 'rgb(183, 107, 1)'}}>True</span><span style={{color: 'rgb(56, 58, 66)'}}>:</span></span>{"\n"}<span style={{display: 'inline-block'}} className="line">
                <span style={{color: 'rgb(56, 58, 66)'}}>{"            "}</span><span style={{color: 'rgb(166, 38, 164)'}}>try</span><span style={{color: 'rgb(56, 58, 66)'}}>:</span></span>{"\n"}<span style={{display: 'inline-block'}} className="line">
                <span style={{color: 'rgb(56, 58, 66)'}}>{"                "}</span><span style={{color: 'rgb(56, 58, 66)'}}>data </span><span style={{color: 'rgb(166, 38, 164)'}}>=</span><span style={{color: 'rgb(56, 58, 66)'}}> conn.</span><span style={{color: 'rgb(64, 120, 242)'}}>recv</span><span style={{color: 'rgb(56, 58, 66)'}}>(</span><span style={{color: 'rgb(183, 107, 1)'}}>4096</span><span style={{color: 'rgb(56, 58, 66)'}}>)</span></span>{"\n"}<span style={{display: 'inline-block'}} className="line">
                <span style={{color: 'rgb(56, 58, 66)'}}>{"                "}</span><span style={{color: 'rgb(56, 58, 66)'}}>encryptingMessage </span><span style={{color: 'rgb(166, 38, 164)'}}>=</span><span style={{color: 'rgb(56, 58, 66)'}}> data </span><span style={{color: 'rgb(166, 38, 164)'}}>+</span><span style={{color: 'rgb(56, 58, 66)'}}> FLAG</span></span>{"\n"}<span style={{display: 'inline-block'}} className="line">
                <span style={{color: 'rgb(56, 58, 66)'}}>{"                "}</span><span style={{color: 'rgb(56, 58, 66)'}}>toSend </span><span style={{color: 'rgb(166, 38, 164)'}}>=</span><span style={{color: 'rgb(56, 58, 66)'}}> </span><span style={{color: 'rgb(64, 120, 242)'}}>encrypt</span><span style={{color: 'rgb(56, 58, 66)'}}>(encryptingMessage, iv)</span></span>{"\n"}<span style={{display: 'inline-block'}} className="line">
                <span style={{color: 'rgb(56, 58, 66)'}}>{"                "}</span><span style={{color: 'rgb(56, 58, 66)'}}>iv </span><span style={{color: 'rgb(166, 38, 164)'}}>=</span><span style={{color: 'rgb(56, 58, 66)'}}> toSend[</span><span style={{color: 'rgb(166, 38, 164)'}}>-</span><span style={{color: 'rgb(183, 107, 1)'}}>16</span><span style={{color: 'rgb(56, 58, 66)'}}>:]</span></span>{"\n"}<span style={{display: 'inline-block'}} className="line">
                <span style={{color: 'rgb(56, 58, 66)'}}>{"                "}</span><span style={{color: 'rgb(56, 58, 66)'}}>conn.</span><span style={{color: 'rgb(64, 120, 242)'}}>sendall</span><span style={{color: 'rgb(56, 58, 66)'}}>(toSend)</span></span>{"\n"}<span style={{display: 'inline-block'}} className="line">
                <span style={{color: 'rgb(56, 58, 66)'}}>{"            "}</span><span style={{color: 'rgb(166, 38, 164)'}}>except</span><span style={{color: 'rgb(56, 58, 66)'}}>:</span></span>{"\n"}<span style={{display: 'inline-block'}} className="line">
                <span style={{color: 'rgb(56, 58, 66)'}}>{"                "}</span><span style={{color: 'rgb(166, 38, 164)'}}>break</span>
            </span></code></pre>
        </DropDown>
        <p>
            Looking through the code we can see that this is some form of AES encryption service using CBC.
            We are also given the initial IV when we first connect.
        </p><br />
        <p>
            We can also see that there is no information given about the key used which implies that we don't want to try
            and guess the key and we might be able to work out the flag without the key.
        </p><br />
        <p>
            Next it's best to look at how AES CBC works and if there are any vulnerabilities we can use.
        </p>
        <img src="https://upload.wikimedia.org/wikipedia/commons/8/80/CBC_encryption.svg" alt="cbc structure"/>
        <p>
            The message we want to encrypt (the plaintext) is split into blocks of 16. The first block and the IV are
            combined with a bitwise xor and then the result in encrypted. This result makes up the first block of the 
            ciphertext and is used in the xor with the second block. This continues for each block until the entire
            plaintext is converted into ciphertext.
        </p><br />
        <p>
            This is all the information we need to be able to crack the first part of this challenge, making the IV
            effectively redundant. This is done using the following property of the xor operator.
        </p>
        <MathComponent tex={String.raw`\alpha \oplus \beta = 0 \Leftrightarrow \alpha = \beta`} />
        <p>
            This means that if we set the first block equal to the IV then the xor of this will be 0. When this is
            encrypted by AES and a constant key the out put will always be the same. This then means that when the 
            second block is combined with the ciphertext, the ciphertext is constant and we can treat the second 
            block as the first, just now with a constant IV.
        </p><br />
        <p>
            In summary, if we put the next IV at the start of our message to the server then the encrypted message
            will always be the same, removing the randomness that is usually made by the IV.
        </p><br />
        <p>
            This allows us the guess the second block. If we send <b>IV</b> to the server then look at the 
            output of the second block we have our target. We can then send <b>IV + guess</b> to the server 
            and if the second block of the ciphertext matches our target we know that our guess is correct and 
            we can continue onto the next block until all blocks have been cracked.
        </p><br />
        <p>
            This sounds great but even with the restricted alphabet that we are guessing for there are
            still <b>3.2452x10<sup>32</sup></b> different guesses. This is way to many to guess all of them 
            so we can reduce this by only guessing one character at a time. If you want to try and work out how 
            it can be done quite cleverly by taking advantage of how our message is combined with the flag on the 
            server.
        </p><br />
        <p>
            If you've not worked it out (or just can't be bothered) we can guess only one letter at a time by 
            filling the rest of the plaintext with known values and having the last character of the block be
            the first character of the flag. Then we can guess the last character and move onto the next character.
        </p><br />
        <p>Example<br />If we send to the server the following message:</p>
        <p><b>IV</b> + xxxxxxxxxxxxxxx</p>
        <p>Then the first two block will be the encrypted version of the plaintext</p>
        <p><b>IV</b> + xxxxxxxxxxxxxxx?</p>
        <p>Where <b>?</b> is the first character of the flag, this is our target.</p>
        <p>To find the value of <b>?</b> we can next send the messages</p>
        <p><b>IV</b> + xxxxxxxxxxxxxxxA, <b>IV</b> + xxxxxxxxxxxxxxxB, <b>IV</b> + xxxxxxxxxxxxxxxC ...</p>
        <p>
            As soon as the second block of ciphertext matches our target we know that our guess was correct
            and we can move onto the next character.
        </p><br />
        <p>
            Using this method we only have to make at
            most <Tex2SVG display="inline" latex="\text{alphabet size} * \text{flag length}" />. This is
            far smaller then the previous <Tex2SVG display="inline" latex="\text{block size} ^ \text{alphabet size} * \text{blocks in flag}" />.
            We will use this method to work out what the flag is.
        </p><br />
        <p>
            I've made an interactive example of how this process works below. It doesn't use the same encryption methods
            but the same methodology applies. <b><span style={{color: "red"}}>Red</span></b> characters and 'unknown' from the 
            flag and <b><span style={{color: "blue"}}>Blue</span></b> characters are from your message input. For simplicity 
            the <b>IV</b> is fixed so can be ignored and the block size is 8 rather than the standard 16.
        </p><br />
        {InteractiveEncryption(false, 'secure super secret flag')}<br />
        <p>
            To get an understanding of how this works try entering the following while looking at the output:
        </p>
        <ul>
            <li><b>xxxxxxx</b></li>
            <li><b>xxxxxxxs</b></li>
        </ul>
        <p>And then</p>
        <ul>
            <li><b>xxxxxx</b></li>
            <li><b>xxxxxxse</b></li>
        </ul><br />
        <p>
            As you can see the first blocks output is the same so you can work out the first block. To then work out the 
            second try entering:
        </p>
        <ul>
            <li><b>xxxxxxx</b></li>
            <li><b>xxxxxxxsecure su</b></li>
        </ul>
        <p>This process can be repeated for for each block until all are decrypted</p><br />
        <p>
            If you want to try and work this out yourself you can try with a hidden message below. It has
            a fixed <b>IV</b>, has an alphabet of lowercase letters and space, and is 24 characters long.
        </p>
        <p><i>
            Hint: Once you have the first few characters you can start guessing what the flag is to speed up 
            finding new characters.
        </i></p>
        <br />
        {InteractiveEncryption(true, 'well done for solving it')}
        <br /><br />
        <p>
            This process can be automated by a script and I've written one in python that can solve this problem
            very fast. Below is the full code.
        </p><br />
        <DropDown>
            <h4>responder.py <i className="arrow down" style={{float: "right", marginRight: "10px"}} /></h4>
            <pre className="code"><code><span style={{display: 'inline-block'}} className="line">
                <span style={{color: 'rgb(166, 38, 164)'}}>import</span><span style={{color: 'rgb(56, 58, 66)'}}> socket</span></span>{"\n"}<span style={{display: 'inline-block'}} className="line">
                <span style={{color: 'rgb(56, 58, 66)'}}> </span></span>{"\n"}<span style={{display: 'inline-block'}} className="line">
                <span style={{color: 'rgb(56, 58, 66)'}}>HOST </span><span style={{color: 'rgb(166, 38, 164)'}}>=</span><span style={{color: 'rgb(56, 58, 66)'}}> </span><span style={{color: 'rgb(80, 161, 79)'}}>'127.0.0.1'</span><span style={{color: 'rgb(56, 58, 66)'}}>{"  "}</span><span style={{color: 'rgb(160, 161, 167)', fontStyle: 'italic'}}># The server's hostname or IP address</span></span>{"\n"}<span style={{display: 'inline-block'}} className="line">
                <span style={{color: 'rgb(56, 58, 66)'}}>PORT </span><span style={{color: 'rgb(166, 38, 164)'}}>=</span><span style={{color: 'rgb(56, 58, 66)'}}> </span><span style={{color: 'rgb(183, 107, 1)'}}>65432</span><span style={{color: 'rgb(56, 58, 66)'}}>{"        "}</span><span style={{color: 'rgb(160, 161, 167)', fontStyle: 'italic'}}># The port used by the server</span></span>{"\n"}<span style={{display: 'inline-block'}} className="line">
                <span style={{color: 'rgb(56, 58, 66)'}}> </span></span>{"\n"}<span style={{display: 'inline-block'}} className="line">
                <span style={{color: 'rgb(166, 38, 164)'}}>with</span><span style={{color: 'rgb(56, 58, 66)'}}> socket.</span><span style={{color: 'rgb(64, 120, 242)'}}>socket</span><span style={{color: 'rgb(56, 58, 66)'}}>(socket.</span><span style={{color: 'rgb(228, 86, 73)'}}>AF_INET</span><span style={{color: 'rgb(56, 58, 66)'}}>, socket.</span><span style={{color: 'rgb(228, 86, 73)'}}>SOCK_STREAM</span><span style={{color: 'rgb(56, 58, 66)'}}>) </span><span style={{color: 'rgb(166, 38, 164)'}}>as</span><span style={{color: 'rgb(56, 58, 66)'}}> s:</span></span>{"\n"}<span style={{display: 'inline-block'}} className="line">
                <span style={{color: 'rgb(56, 58, 66)'}}>{"    "}</span><span style={{color: 'rgb(56, 58, 66)'}}>s.</span><span style={{color: 'rgb(64, 120, 242)'}}>connect</span><span style={{color: 'rgb(56, 58, 66)'}}>((HOST, PORT))</span></span>{"\n"}<span style={{display: 'inline-block'}} className="line">
                <span style={{color: 'rgb(56, 58, 66)'}}>{"    "}</span><span style={{color: 'rgb(56, 58, 66)'}}>iv </span><span style={{color: 'rgb(166, 38, 164)'}}>=</span><span style={{color: 'rgb(56, 58, 66)'}}> s.</span><span style={{color: 'rgb(64, 120, 242)'}}>recv</span><span style={{color: 'rgb(56, 58, 66)'}}>(</span><span style={{color: 'rgb(183, 107, 1)'}}>4096</span><span style={{color: 'rgb(56, 58, 66)'}}>)</span></span>{"\n"}<span style={{display: 'inline-block'}} className="line">
                <span style={{color: 'rgb(56, 58, 66)'}}> </span></span>{"\n"}<span style={{display: 'inline-block'}} className="line">
                <span style={{color: 'rgb(56, 58, 66)'}}>{"    "}</span><span style={{color: 'rgb(1, 132, 188)'}}>print</span><span style={{color: 'rgb(56, 58, 66)'}}>(</span><span style={{color: 'rgb(80, 161, 79)'}}>'IV: '</span><span style={{color: 'rgb(56, 58, 66)'}}>, iv.</span><span style={{color: 'rgb(64, 120, 242)'}}>hex</span><span style={{color: 'rgb(56, 58, 66)'}}>())</span></span>{"\n"}<span style={{display: 'inline-block'}} className="line">
                <span style={{color: 'rgb(56, 58, 66)'}}> </span></span>{"\n"}<span style={{display: 'inline-block'}} className="line">
                <span style={{color: 'rgb(56, 58, 66)'}}>{"    "}</span><span style={{color: 'rgb(56, 58, 66)'}}>secret </span><span style={{color: 'rgb(166, 38, 164)'}}>=</span><span style={{color: 'rgb(56, 58, 66)'}}> </span><span style={{color: 'rgb(80, 161, 79)'}}>""</span></span>{"\n"}<span style={{display: 'inline-block'}} className="line">
                <span style={{color: 'rgb(56, 58, 66)'}}>{"    "}</span><span style={{color: 'rgb(56, 58, 66)'}}>block </span><span style={{color: 'rgb(166, 38, 164)'}}>=</span><span style={{color: 'rgb(56, 58, 66)'}}> </span><span style={{color: 'rgb(183, 107, 1)'}}>0</span></span>{"\n"}<span style={{display: 'inline-block'}} className="line">
                <span style={{color: 'rgb(56, 58, 66)'}}> </span></span>{"\n"}<span style={{display: 'inline-block'}} className="line">
                <span style={{color: 'rgb(56, 58, 66)'}}>{"    "}</span><span style={{color: 'rgb(56, 58, 66)'}}>decoding </span><span style={{color: 'rgb(166, 38, 164)'}}>=</span><span style={{color: 'rgb(56, 58, 66)'}}> </span><span style={{color: 'rgb(183, 107, 1)'}}>True</span></span>{"\n"}<span style={{display: 'inline-block'}} className="line">
                <span style={{color: 'rgb(56, 58, 66)'}}> </span></span>{"\n"}<span style={{display: 'inline-block'}} className="line">
                <span style={{color: 'rgb(56, 58, 66)'}}>{"    "}</span><span style={{color: 'rgb(166, 38, 164)'}}>while</span><span style={{color: 'rgb(56, 58, 66)'}}> decoding: </span><span style={{color: 'rgb(160, 161, 167)', fontStyle: 'italic'}}># decodes one block at a time</span></span>{"\n"}<span style={{display: 'inline-block'}} className="line">
                <span style={{color: 'rgb(56, 58, 66)'}}>{"        "}</span><span style={{color: 'rgb(166, 38, 164)'}}>try</span><span style={{color: 'rgb(56, 58, 66)'}}>:</span></span>{"\n"}<span style={{display: 'inline-block'}} className="line">
                <span style={{color: 'rgb(56, 58, 66)'}}>{"            "}</span><span style={{color: 'rgb(166, 38, 164)'}}>for</span><span style={{color: 'rgb(56, 58, 66)'}}> unknownchar </span><span style={{color: 'rgb(166, 38, 164)'}}>in</span><span style={{color: 'rgb(56, 58, 66)'}}> </span><span style={{color: 'rgb(1, 132, 188)'}}>range</span><span style={{color: 'rgb(56, 58, 66)'}}>(</span><span style={{color: 'rgb(183, 107, 1)'}}>16</span><span style={{color: 'rgb(56, 58, 66)'}}>): </span><span style={{color: 'rgb(160, 161, 167)', fontStyle: 'italic'}}># each unknown character in the block</span></span>{"\n"}<span style={{display: 'inline-block'}} className="line">
                <span style={{color: 'rgb(56, 58, 66)'}}>{"                "}</span><span style={{color: 'rgb(56, 58, 66)'}}>test </span><span style={{color: 'rgb(166, 38, 164)'}}>=</span><span style={{color: 'rgb(56, 58, 66)'}}> (</span><span style={{color: 'rgb(183, 107, 1)'}}>15</span><span style={{color: 'rgb(56, 58, 66)'}}> </span><span style={{color: 'rgb(166, 38, 164)'}}>-</span><span style={{color: 'rgb(56, 58, 66)'}}> unknownchar) </span><span style={{color: 'rgb(166, 38, 164)'}}>*</span><span style={{color: 'rgb(56, 58, 66)'}}> </span><span style={{color: 'rgb(80, 161, 79)'}}>"x"</span></span>{"\n"}<span style={{display: 'inline-block'}} className="line">
                <span style={{color: 'rgb(56, 58, 66)'}}>{"                "}</span><span style={{color: 'rgb(1, 132, 188)'}}>print</span><span style={{color: 'rgb(56, 58, 66)'}}>(</span><span style={{color: 'rgb(80, 161, 79)'}}>"Testing with: "</span><span style={{color: 'rgb(56, 58, 66)'}}> </span><span style={{color: 'rgb(166, 38, 164)'}}>+</span><span style={{color: 'rgb(56, 58, 66)'}}> test </span><span style={{color: 'rgb(166, 38, 164)'}}>+</span><span style={{color: 'rgb(56, 58, 66)'}}> secret </span><span style={{color: 'rgb(166, 38, 164)'}}>+</span><span style={{color: 'rgb(56, 58, 66)'}}> </span><span style={{color: 'rgb(80, 161, 79)'}}>"_"</span><span style={{color: 'rgb(56, 58, 66)'}}>)</span></span>{"\n"}<span style={{display: 'inline-block'}} className="line">
                <span style={{color: 'rgb(56, 58, 66)'}}>{"                "}</span><span style={{color: 'rgb(56, 58, 66)'}}>s.</span><span style={{color: 'rgb(64, 120, 242)'}}>sendall</span><span style={{color: 'rgb(56, 58, 66)'}}>(iv </span><span style={{color: 'rgb(166, 38, 164)'}}>+</span><span style={{color: 'rgb(56, 58, 66)'}}> str.</span><span style={{color: 'rgb(64, 120, 242)'}}>encode</span><span style={{color: 'rgb(56, 58, 66)'}}>(test))</span></span>{"\n"}<span style={{display: 'inline-block'}} className="line">
                <span style={{color: 'rgb(56, 58, 66)'}}>{"                "}</span><span style={{color: 'rgb(56, 58, 66)'}}>response </span><span style={{color: 'rgb(166, 38, 164)'}}>=</span><span style={{color: 'rgb(56, 58, 66)'}}> s.</span><span style={{color: 'rgb(64, 120, 242)'}}>recv</span><span style={{color: 'rgb(56, 58, 66)'}}>(</span><span style={{color: 'rgb(183, 107, 1)'}}>4096</span><span style={{color: 'rgb(56, 58, 66)'}}>)</span></span>{"\n"}<span style={{display: 'inline-block'}} className="line">
                <span style={{color: 'rgb(56, 58, 66)'}}>{"                "}</span><span style={{color: 'rgb(56, 58, 66)'}}>iv </span><span style={{color: 'rgb(166, 38, 164)'}}>=</span><span style={{color: 'rgb(56, 58, 66)'}}> response[</span><span style={{color: 'rgb(166, 38, 164)'}}>-</span><span style={{color: 'rgb(183, 107, 1)'}}>16</span><span style={{color: 'rgb(56, 58, 66)'}}>:]</span></span>{"\n"}<span style={{display: 'inline-block'}} className="line">
                <span style={{color: 'rgb(56, 58, 66)'}}>{"                "}</span><span style={{color: 'rgb(56, 58, 66)'}}>target </span><span style={{color: 'rgb(166, 38, 164)'}}>=</span><span style={{color: 'rgb(56, 58, 66)'}}> response[(block</span><span style={{color: 'rgb(166, 38, 164)'}}>+</span><span style={{color: 'rgb(183, 107, 1)'}}>1</span><span style={{color: 'rgb(56, 58, 66)'}}>)</span><span style={{color: 'rgb(166, 38, 164)'}}>*</span><span style={{color: 'rgb(183, 107, 1)'}}>16</span><span style={{color: 'rgb(56, 58, 66)'}}>:(block</span><span style={{color: 'rgb(166, 38, 164)'}}>+</span><span style={{color: 'rgb(183, 107, 1)'}}>2</span><span style={{color: 'rgb(56, 58, 66)'}}>)</span><span style={{color: 'rgb(166, 38, 164)'}}>*</span><span style={{color: 'rgb(183, 107, 1)'}}>16</span><span style={{color: 'rgb(56, 58, 66)'}}>] </span><span style={{color: 'rgb(160, 161, 167)', fontStyle: 'italic'}}># block we are trying to match</span></span>{"\n"}<span style={{display: 'inline-block'}} className="line">
                <span style={{color: 'rgb(56, 58, 66)'}}>{"                "}</span><span style={{color: 'rgb(56, 58, 66)'}}>found </span><span style={{color: 'rgb(166, 38, 164)'}}>=</span><span style={{color: 'rgb(56, 58, 66)'}}> </span><span style={{color: 'rgb(183, 107, 1)'}}>False</span></span>{"\n"}<span style={{display: 'inline-block'}} className="line">
                <span style={{color: 'rgb(56, 58, 66)'}}>{"                "}</span><span style={{color: 'rgb(166, 38, 164)'}}>for</span><span style={{color: 'rgb(56, 58, 66)'}}> possibleChar </span><span style={{color: 'rgb(166, 38, 164)'}}>in</span><span style={{color: 'rgb(56, 58, 66)'}}> </span><span style={{color: 'rgb(80, 161, 79)'}}>"ABCDEFGHIJKLMNOPQRSTUVWXYZ "</span><span style={{color: 'rgb(56, 58, 66)'}}>: </span><span style={{color: 'rgb(160, 161, 167)', fontStyle: 'italic'}}># check all possible characters</span></span>{"\n"}<span style={{display: 'inline-block'}} className="line">
                <span style={{color: 'rgb(56, 58, 66)'}}>{"                    "}</span><span style={{color: 'rgb(56, 58, 66)'}}>message </span><span style={{color: 'rgb(166, 38, 164)'}}>=</span><span style={{color: 'rgb(56, 58, 66)'}}> (</span><span style={{color: 'rgb(183, 107, 1)'}}>15</span><span style={{color: 'rgb(56, 58, 66)'}}> </span><span style={{color: 'rgb(166, 38, 164)'}}>-</span><span style={{color: 'rgb(56, 58, 66)'}}> unknownchar) </span><span style={{color: 'rgb(166, 38, 164)'}}>*</span><span style={{color: 'rgb(56, 58, 66)'}}> </span><span style={{color: 'rgb(80, 161, 79)'}}>"x"</span><span style={{color: 'rgb(56, 58, 66)'}}> </span><span style={{color: 'rgb(166, 38, 164)'}}>+</span><span style={{color: 'rgb(56, 58, 66)'}}> secret </span><span style={{color: 'rgb(166, 38, 164)'}}>+</span><span style={{color: 'rgb(56, 58, 66)'}}> possibleChar </span><span style={{color: 'rgb(160, 161, 167)', fontStyle: 'italic'}}># our guess</span></span>{"\n"}<span style={{display: 'inline-block'}} className="line">
                <span style={{color: 'rgb(56, 58, 66)'}}>{"                    "}</span><span style={{color: 'rgb(56, 58, 66)'}}>s.</span><span style={{color: 'rgb(64, 120, 242)'}}>sendall</span><span style={{color: 'rgb(56, 58, 66)'}}>(iv </span><span style={{color: 'rgb(166, 38, 164)'}}>+</span><span style={{color: 'rgb(56, 58, 66)'}}> str.</span><span style={{color: 'rgb(64, 120, 242)'}}>encode</span><span style={{color: 'rgb(56, 58, 66)'}}>(message))</span></span>{"\n"}<span style={{display: 'inline-block'}} className="line">
                <span style={{color: 'rgb(56, 58, 66)'}}>{"                    "}</span><span style={{color: 'rgb(56, 58, 66)'}}>response </span><span style={{color: 'rgb(166, 38, 164)'}}>=</span><span style={{color: 'rgb(56, 58, 66)'}}> s.</span><span style={{color: 'rgb(64, 120, 242)'}}>recv</span><span style={{color: 'rgb(56, 58, 66)'}}>(</span><span style={{color: 'rgb(183, 107, 1)'}}>4096</span><span style={{color: 'rgb(56, 58, 66)'}}>)</span></span>{"\n"}<span style={{display: 'inline-block'}} className="line">
                <span style={{color: 'rgb(56, 58, 66)'}}>{"                    "}</span><span style={{color: 'rgb(56, 58, 66)'}}>iv </span><span style={{color: 'rgb(166, 38, 164)'}}>=</span><span style={{color: 'rgb(56, 58, 66)'}}> response[</span><span style={{color: 'rgb(166, 38, 164)'}}>-</span><span style={{color: 'rgb(183, 107, 1)'}}>16</span><span style={{color: 'rgb(56, 58, 66)'}}>:] </span><span style={{color: 'rgb(160, 161, 167)', fontStyle: 'italic'}}># update the next iv</span></span>{"\n"}<span style={{display: 'inline-block'}} className="line">
                <span style={{color: 'rgb(56, 58, 66)'}}>{"                    "}</span><span style={{color: 'rgb(166, 38, 164)'}}>if</span><span style={{color: 'rgb(56, 58, 66)'}}> target </span><span style={{color: 'rgb(166, 38, 164)'}}>==</span><span style={{color: 'rgb(56, 58, 66)'}}> response[(block</span><span style={{color: 'rgb(166, 38, 164)'}}>+</span><span style={{color: 'rgb(183, 107, 1)'}}>1</span><span style={{color: 'rgb(56, 58, 66)'}}>)</span><span style={{color: 'rgb(166, 38, 164)'}}>*</span><span style={{color: 'rgb(183, 107, 1)'}}>16</span><span style={{color: 'rgb(56, 58, 66)'}}>:(block</span><span style={{color: 'rgb(166, 38, 164)'}}>+</span><span style={{color: 'rgb(183, 107, 1)'}}>2</span><span style={{color: 'rgb(56, 58, 66)'}}>)</span><span style={{color: 'rgb(166, 38, 164)'}}>*</span><span style={{color: 'rgb(183, 107, 1)'}}>16</span><span style={{color: 'rgb(56, 58, 66)'}}>]:</span></span>{"\n"}<span style={{display: 'inline-block'}} className="line">
                <span style={{color: 'rgb(56, 58, 66)'}}>{"                        "}</span><span style={{color: 'rgb(56, 58, 66)'}}>secret </span><span style={{color: 'rgb(166, 38, 164)'}}>+=</span><span style={{color: 'rgb(56, 58, 66)'}}> possibleChar </span><span style={{color: 'rgb(160, 161, 167)', fontStyle: 'italic'}}># if blocks match then char is correct</span></span>{"\n"}<span style={{display: 'inline-block'}} className="line">
                <span style={{color: 'rgb(56, 58, 66)'}}>{"                        "}</span><span style={{color: 'rgb(1, 132, 188)'}}>print</span><span style={{color: 'rgb(56, 58, 66)'}}>(</span><span style={{color: 'rgb(80, 161, 79)'}}>"Secret found so far: "</span><span style={{color: 'rgb(56, 58, 66)'}}> </span><span style={{color: 'rgb(166, 38, 164)'}}>+</span><span style={{color: 'rgb(56, 58, 66)'}}> secret)</span></span>{"\n"}<span style={{display: 'inline-block'}} className="line">
                <span style={{color: 'rgb(56, 58, 66)'}}>{"                        "}</span><span style={{color: 'rgb(56, 58, 66)'}}>found </span><span style={{color: 'rgb(166, 38, 164)'}}>=</span><span style={{color: 'rgb(56, 58, 66)'}}> </span><span style={{color: 'rgb(183, 107, 1)'}}>True</span></span>{"\n"}<span style={{display: 'inline-block'}} className="line">
                <span style={{color: 'rgb(56, 58, 66)'}}>{"                        "}</span><span style={{color: 'rgb(166, 38, 164)'}}>break</span></span>{"\n"}<span style={{display: 'inline-block'}} className="line">
                <span style={{color: 'rgb(56, 58, 66)'}}>{"                "}</span><span style={{color: 'rgb(166, 38, 164)'}}>if</span><span style={{color: 'rgb(56, 58, 66)'}}> </span><span style={{color: 'rgb(166, 38, 164)'}}>not</span><span style={{color: 'rgb(56, 58, 66)'}}> found:</span></span>{"\n"}<span style={{display: 'inline-block'}} className="line">
                <span style={{color: 'rgb(56, 58, 66)'}}>{"                    "}</span><span style={{color: 'rgb(56, 58, 66)'}}>decoding </span><span style={{color: 'rgb(166, 38, 164)'}}>=</span><span style={{color: 'rgb(56, 58, 66)'}}> </span><span style={{color: 'rgb(183, 107, 1)'}}>False</span></span>{"\n"}<span style={{display: 'inline-block'}} className="line">
                <span style={{color: 'rgb(56, 58, 66)'}}>{"            "}</span><span style={{color: 'rgb(56, 58, 66)'}}>block </span><span style={{color: 'rgb(166, 38, 164)'}}>+=</span><span style={{color: 'rgb(56, 58, 66)'}}> </span><span style={{color: 'rgb(183, 107, 1)'}}>1</span></span>{"\n"}<span style={{display: 'inline-block'}} className="line">
                <span style={{color: 'rgb(56, 58, 66)'}}>{"        "}</span><span style={{color: 'rgb(166, 38, 164)'}}>except</span><span style={{color: 'rgb(56, 58, 66)'}}>:</span></span>{"\n"}<span style={{display: 'inline-block'}} className="line">
                <span style={{color: 'rgb(56, 58, 66)'}}>{"            "}</span><span style={{color: 'rgb(166, 38, 164)'}}>break</span></span>{"\n"}<span style={{display: 'inline-block'}} className="line">
                <span style={{color: 'rgb(56, 58, 66)'}}> </span></span>{"\n"}<span style={{display: 'inline-block'}} className="line">
                <span style={{color: 'rgb(56, 58, 66)'}}>{"    "}</span><span style={{color: 'rgb(1, 132, 188)'}}>print</span><span style={{color: 'rgb(56, 58, 66)'}}>(</span><span style={{color: 'rgb(80, 161, 79)'}}>"</span><span style={{color: 'rgb(80, 161, 79)'}}>\n</span><span style={{color: 'rgb(80, 161, 79)'}}>Secret: "</span><span style={{color: 'rgb(56, 58, 66)'}}> </span><span style={{color: 'rgb(166, 38, 164)'}}>+</span><span style={{color: 'rgb(56, 58, 66)'}}> secret)</span>
            </span></code></pre>
        </DropDown>

    </div>
}

export default Component;