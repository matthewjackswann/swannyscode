import Collapsible from "../../../Components/Collapsible";
import CodeSnippet from "../../../Components/CodeSnippet";

const challCode = `from sympy import *
from hashlib import md5
from Crypto.Cipher import AES
from Crypto.Util.Padding import pad
from random import randint, randbytes, seed
from Crypto.Util.number import bytes_to_long
 
FLAG = "HTB{dummyflag}".encode('ascii')
class Shamir:
    def __init__(self, prime, k, n):
        self.p = prime
        self.secret = randint(1,self.p-1)
        self.k = k
        self.n = n
        self.coeffs = [self.secret]
        self.x_vals = []
        self.y_vals = []
 
    def next_coeff(self, val):
        return int(md5(val.to_bytes(32, byteorder="big")).hexdigest(),16)
 
    def calc_coeffs(self):
        for i in range(1,self.n+1):
            self.coeffs.append(self.next_coeff(self.coeffs[i-1]))
 
    def calc_y(self, x):
        y = 0
        for i, coeff in enumerate(self.coeffs):
            y +=coeff *x**i
        return y%self.p
 
 
    def create_pol(self):
        self.calc_coeffs()
        self.coeffs = self.coeffs[:self.k]
        for i in range(self.n):
            x = randint(1,self.p-1)
            self.x_vals.append(x)
            self.y_vals.append(self.calc_y(x))
 
    def get_share(self):
        return self.x_vals[0], self.y_vals[0]
 
 
def main():
    sss = Shamir(92434467187580489687, 10, 18)
    sss.create_pol()
    share = sss.get_share()
    seed(sss.secret)
    key = randbytes(16)
    cipher = AES.new(key, AES.MODE_ECB)
    enc_FLAG = cipher.encrypt(pad(FLAG,16)).hex()
 
    f = open('msg.enc', 'w')
    f.write('share: ' + str(share) + '\\n')
    f.write('coefficient: ' + str(sss.coeffs[1]) + '\\n')
    f.write('secret message: ' + str(enc_FLAG) + '\\n')
    f.close()
 
if __name__ == "__main__":
    main()`

const coeffCode = `# relevant code but slightly simplified
def next_coeff(val):
    return int(md5(val).hexdigest(),16)

def calc_coeffs():
    for i in range(1,n+1):
        coeffs.append(next_coeff(coeffs[i-1]))

def create_pol():
    calc_coeffs()
    coeffs = coeffs[:k]
    # other stuff after this

sss = Shamir(92434467187580489687, 10, 18)
# sets p = 92434467187580489687, k = 10, n = 18
# coeffs = [secret]
sss.create_pol()`

function SpacePirates() {

    return (<div>
        <p>
            This is one of the cryptography challenges in the HTB Uni CTF Qualifiers 2021.
        </p>

        <pre class="syntax--editor syntax--editor-colors"><div class="syntax--line"><span class="syntax--source syntax--python"><span class="syntax--keyword syntax--control syntax--repeat syntax--python"><span>for</span></span><span>&nbsp;</span><span>x</span><span>&nbsp;</span><span class="syntax--keyword syntax--operator syntax--logical syntax--python"><span>in</span></span><span>&nbsp;</span><span class="syntax--meta syntax--structure syntax--list syntax--python"><span class="syntax--punctuation syntax--definition syntax--list syntax--begin syntax--python"><span>[</span></span><span class="syntax--meta syntax--structure syntax--list syntax--item syntax--python"><span class="syntax--constant syntax--numeric syntax--integer syntax--decimal syntax--python"><span>1</span></span></span><span class="syntax--punctuation syntax--separator syntax--list syntax--python"><span>,</span></span><span class="syntax--meta syntax--structure syntax--list syntax--item syntax--python"><span class="syntax--constant syntax--numeric syntax--integer syntax--decimal syntax--python"><span>2</span></span></span><span class="syntax--punctuation syntax--separator syntax--list syntax--python"><span>,</span></span><span class="syntax--meta syntax--structure syntax--list syntax--item syntax--python"><span class="syntax--constant syntax--numeric syntax--integer syntax--decimal syntax--python"><span>3</span></span></span><span class="syntax--punctuation syntax--definition syntax--list syntax--end syntax--python"><span>]</span></span></span><span>:</span></span></div><div class="syntax--line"><span class="syntax--source syntax--python"><span>	</span><span class="syntax--keyword syntax--other syntax--python"><span>print</span></span><span>(</span><span>x</span><span>)</span></span></div><div class="syntax--line"><span class="syntax--source syntax--python"><span>&nbsp;</span></span></div><div class="syntax--line"><span class="syntax--source syntax--python"><span>c</span><span>&nbsp;</span><span class="syntax--keyword syntax--operator syntax--assignment syntax--python"><span>=</span></span><span>&nbsp;</span><span class="syntax--string syntax--quoted syntax--double syntax--single-line syntax--python"><span class="syntax--punctuation syntax--definition syntax--string syntax--begin syntax--python"><span>"</span></span><span>hi</span><span class="syntax--punctuation syntax--definition syntax--string syntax--end syntax--python"><span>"</span></span></span></span></div></pre>

        <p className="pt-4">
            We are given a zipped folder containing two files. A python script which encodes a secret key and the file created by the script.
        </p>

        <Collapsible className="cc mt-2 p-2 bg-background-faded dark:bg-background-faded-dark rounded-md" header={<div className="text-lg font-bold">chall.py</div>}>
            <CodeSnippet className="python rounded-md">
                {challCode}
            </CodeSnippet>
        </Collapsible>

        <Collapsible className="cc mt-2 p-2 bg-background-faded dark:bg-background-faded-dark rounded-md" header={<div className="text-lg font-bold">msg.enc</div>}>
            <CodeSnippet className="text rounded-md">
                {`share: (21202245407317581090, 11086299714260406068)
coefficient: 93526756371754197321930622219489764824
secret message:1aaad05f3f187bcbb3fb5c9e233ea339082062fc10a59604d96bcc38d0af92cd842ad7301b5b72bd5378265dae0bc1c1e9f09a90c97b35cfadbcfe259021ce495e9b91d29f563ae7d49b66296f15e7999c9e547fac6f1a2ee682579143da511475ea791d24b5df6affb33147d57718eaa5b1b578230d97f395c458fc2c9c36525db1ba7b1097ad8f5df079994b383b32695ed9a372ea9a0eb1c6c18b3d3d43bd2db598667ef4f80845424d6c75abc88b59ef7c119d505cd696ed01c65f374a0df3f331d7347052faab63f76f587400b6a6f8b718df1db9cebe46a4ec6529bc226627d39baca7716a4c11be6f884c371b08d87c9e432af58c030382b737b9bb63045268a18455b9f1c4011a984a818a5427231320ee7eca39bdfe175333341b7c`}
            </CodeSnippet>
        </Collapsible>

        <p className="pt-4">
            First I looked how the flag is given to us. It's encrypted and then stored in msg.enc as the secret message
        </p>

        <CodeSnippet className="python rounded-md">
            {`seed(sss.secret)
key = randbytes(16)
cipher = AES.new(key, AES.MODE_ECB)
enc_FLAG = cipher.encrypt(pad(FLAG,16)).hex()`}
        </CodeSnippet>

        <p className="pt-4">
            The enconded flag is given to use after it's encrypted with a randomly generated key. We can also see that the random seed is set to <b>sss.secret</b>. This means that if we can work out the value of <b>sss.secret</b>, set the seed and then run <b>randbytes(16)</b> we will get the same key that is used to encrypt the message. We can then decrypt in to get the flag.
        </p>

        <p className="pt-4">
            Looking into the class at where the value of <b>secret</b> is set we can see that it's a random number between <b>1</b> and <b>92434467187580489687</b>. This is before the random seed is set so we can't exploit that to work out it's value. Instead we need to look at how this effects other variables and see if we can work backwards.
        </p>

        <p className="pt-4">
            Next I went on to look at the coefficients as the first coefficient in the list is <b>secret</b>. We are also given the second coefficient in the list as this is the coefficient in <i>msg.enc</i>.
        </p>

        <CodeSnippet className="python rounded-md">
            {coeffCode}
        </CodeSnippet> 

    </div>);
}

export default SpacePirates;