import Collapsible from "../../../Components/Collapsible";
import CodeSnippet from "../../../Components/CodeSnippet";
import { SpacePiratesChallenge, SpacePiratesEnc, SpacePiratesEncoding, SpacePiratesCoeffs, SpacePiratesVals, SpacePiratesSol } from "../../Media/CTFCode";
import Latex from "react-latex-next";

function SpacePirates() {

    return (<div>
        <p>
            This is one of the cryptography challenges in the HTB Uni CTF Qualifiers 2021.
        </p>

        <p className="pt-4">
            We are given a zipped folder containing two files. A python script which encodes a secret key and the file created by the script.
        </p>

        <Collapsible className="mt-2 p-2 bg-background-faded dark:bg-background-faded-dark rounded-md" header={<div className="text-lg font-bold">chall.py</div>}>
            <CodeSnippet code={SpacePiratesChallenge} />
        </Collapsible>

        <Collapsible className="cc mt-2 p-2 bg-background-faded dark:bg-background-faded-dark rounded-md" header={<div className="text-lg font-bold">msg.enc</div>}>
            <CodeSnippet code={SpacePiratesEnc}/>
        </Collapsible>

        <p className="pt-4">
            First I looked how the flag is given to us. It's encrypted and then stored in msg.enc as the secret message
        </p>

        <CodeSnippet code={SpacePiratesEncoding} />

        <p className="pt-4">
            The encoded flag is given to use after it's encrypted with a randomly generated key. We can also see that the random seed is set to <b>sss.secret</b>. This means that if we can work out the value of <b>sss.secret</b>, set the seed and then run <b>randbytes(16)</b> we will get the same key that is used to encrypt the message. We can then decrypt in to get the flag.
        </p>

        <p className="pt-4">
            Looking into the class at where the value of <b>secret</b> is set we can see that it's a random number between <b>1</b> and <b>92434467187580489687</b>. This is before the random seed is set so we can't exploit that to work out it's value. Instead we need to look at how this effects other variables and see if we can work backwards.
        </p>

        <p className="py-4">
            Next I went on to look at the coefficients as the first coefficient in the list is <b>secret</b>. We are also given the second coefficient in the list as this is the coefficient in <i>msg.enc</i>.
        </p>

        <CodeSnippet code={SpacePiratesCoeffs} />

        <p className="pt-4">
            In the function <b>create_pol()</b> another function <b>create_coeffs()</b> is called to set up the list of coefficients. This is done by calling the function <b>next_coeff(val)</b> on the previous coefficient in the list.
            <br />
            As we have the second coefficient we can use it to calculate the remaining coefficients. It also tells us that the hash of <b>secret</b> is the second coefficient in the list. We can use this later for checking possible values of secret.
        </p>

        <p className="py-4">
            Now lets look at the two remaining values we are given: <b>x_vals[0]</b> and <b>y_vals[0]</b>.
        </p>

        <CodeSnippet code={SpacePiratesVals} />

        <p className="py-4">
            As we are only given <b>x_vals[0]</b> and <b>y_vals[0]</b> we only need to look at the first loop where they are calculated. <b>x</b> is randomly generated and used to calculate the <b>y</b> value. Their relation can be summarised where <b>c</b> is the list of coefficients:
        </p>

        <Latex>
            {`$$y  \\equiv  \\sum_{r=0}^{ \\mid c \\mid } c[r]x^{r}  \\equiv  c[0] x^{0} + \\sum_{r=1}^{ \\mid c \\mid } c[r]x^{r} \\mod p$$`}
        </Latex>
        <Latex>
            {`$$y  \\equiv  c[0] + \\sum_{r=1}^{ \\mid c \\mid } c[r]x^{r} \\mod p$$`}
        </Latex>

        <p className="py-4">
            This is very useful as we know that <Latex>{`$c[0] \\equiv \\text{secret}$`}</Latex> and <Latex>{`$1 \\lt c[0] \\lt p$`}</Latex>. We also know all but the first values in <b>c</b>, and our values of <b>x</b> and <b>y</b>. We can then rearrange to get <b>secret</b>.
        </p>

        <Latex>{`$$y = (c[0] \\mod p) + (\\sum_{r=1}^{ \\mid c \\mid } c[r]x^{r} \\mod p)$$`}</Latex>
        <Latex>{`$$y  \\equiv  c[0] + \\sum_{r=1}^{ \\mid c \\mid } c[r]x^{r} \\mod p$$`}</Latex>
        <Latex>{`$$c[0] \\equiv y - \\sum_{r=1}^{ \\mid c \\mid } c[r]x^{r} \\mod p$$`}</Latex>

        <p className="py-4">
            We can use this to calculate the value of <b>secret</b> and decode encrypted message.
        </p>

        <CodeSnippet code={SpacePiratesSol} />

    </div>);
}

export default SpacePirates;