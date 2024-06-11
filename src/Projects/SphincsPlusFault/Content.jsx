import ExternalLink from "../../MainComponents/ExternalLink";
import InPageLink from "../../Components/InPageLink";
import Latex from "react-latex-next";
import WOTSChains from "./Media/wotschains.svg"
import MerkleTree1 from "./Media/markle-tree-1.drawio.svg";
import MerkleTree2 from "./Media/markle-tree-2.drawio.svg";
import GraftTree from "./Media/treeGraft.svg";
import oneForgeFaults from "./Media/oneFault.svg";
import myOneFaultFaults from "./Media/myOneFault.svg";
import numFaultComparison from "./Media/numFaultComparison.svg";
import myNumFaultComparison from "./Media/myNumFaultComparison.svg";
import myNumFaultComparison2 from "./Media/myNumFaultComparison_2.svg";
import ReferenceLink from "../../Components/ReferenceLink";

function Sphincs() {
    return <span>SPHINCS<sup>+</sup></span>
}

function Content() {
    return (<div>
        <h1 className="text-5xl"><Sphincs /> Simulated Fault Injection</h1>

        <p className="pb-4">May 16, 2024</p>

        <p>
            <Sphincs /> is a quantum resistant signature scheme. In "Practical Fault Injection Attacks on SPHINCS" <ReferenceLink num={1} /> Genêt, <span className="whitespace-nowrap">J. Kannwischer</span>, Pelletier, and McLauchlan described a fault injection attack on SPHINCS (which was the precursor to <Sphincs />). They outlined how the attack could be adapted to work for <Sphincs />, and as part of my Advanced Cryptography module, I implemented the attack on a modified version of <Sphincs /> which allowed for faultily signing messages.
        </p>

        <p className="py-4">
            For further information on <Sphincs /> visit the <a className="tc underline hover:text-primary dark:hover:text-primary-dark" href="https://sphincs.org/">official website</a>.
        </p>

        <p className="py-4">
            The code was written in golang, forking a pre-existing implementation of <Sphincs />. The full code can be found on my <ExternalLink href="https://github.com/matthewjackswann/SphincsPlus-FaultInjection">Github</ExternalLink>.
        </p>

        <p className="pt-4">This writeup is split into two parts:</p>
        <ul className="list-disc pl-8">
            <li><InPageLink className="tc underline hover:text-primary dark:hover:text-primary-dark cursor-pointer inline" to="section-one">Section One</InPageLink> describes the basics of <Sphincs /> and outlines the basic attack as implemented in my coursework submission.</li>
            <li><InPageLink className="tc underline hover:text-primary dark:hover:text-primary-dark cursor-pointer inline" to="section-two">Section Two</InPageLink> recreates the practicality graphs shown by Genêt et al. We also modify the attack to be multi-targeted, further increasing the efficiency. This was done following the coursework submission.</li>
        </ul>

        <SectionOne />

        <SectionTwo />

        <h3 className="text-2xl pt-8">Conclusion</h3>
        <p>
            This concludes my writeup outlining an attack on <Sphincs />, utilising faults against the WOTS used in the hypertree. <Sphincs /> is a complex scheme and for simplicity, a lot of my descriptions are simplified so that only the relevant properties for the attack are described. Nevertheless, my attacks can create valid forgeries which can be verified by the public key and 3rd-party verification code.
        </p>
        <p>
            I'm glad I came back to the project to create the stats and parallel attack. These confirmed my understanding of the scheme and it's good to see how my intuition about how the attack performs in comparison to SPHINCS was correct.
        </p>

        <p className="pt-8">
            As always please contact me if you have any questions or would like to discuss the project further.
        </p>

        <h3 className="text-2xl pt-36">References</h3>

        <p id="ref1">
            [1] A. Genêt, M. J. Kannwischer, H. Pelletier, and A. McLauchlan, Practical Fault Injection Attacks on SPHINCS. Cryptology ePrint Archive, Paper 2018/674, 2018. [Online]. Available: <a className="tc underline hover:text-primary dark:hover:text-primary-dark" href="https://eprint.iacr.org/2018/674">https://eprint.iacr.org/2018/674</a>
        </p>

    </div>);
}

function SectionOne() {
    return <div className="pt-12">
        <h2 className="text-4xl" id="section-one">Section One - <Sphincs /> Preliminaries</h2>
        <br />
        <p>
            <Sphincs /> is a hash-based signature scheme. It relies on the security of the underlying hash function, making it quantum resistant. Each signature is a path through a hyper-tree (a tree of trees). When a signature is verified, the verifier must traverse the hyper-tree and check that the root of the hyper-tree is the public key. The scheme is stateless, as the hyper-tree is made large enough that it is infeasible to store.
        </p>
        <p className="py-4">
            The hyper-tree is constructed using two main components (there are other components used for greater security however they aren't relevant for the attack or understanding how signatures are constructed). <b>Winternitz One Time Signatures (WOTS)</b> are used for signing, and they are secure as long as each WOTS key pair is only used to sign a single bitstring (hence the One Time name). <b>Merkle trees</b> are used to combine multiple public keys into a single public key, allowing multiple WOTS signatures to be verified using a single public key.
        </p>

        <h3 className="text-2xl">Winternitz One Time Signatures (WOTS)</h3>
        <p>
            WOTS is a hash-based signature scheme. The private key is a set of random values, and the public key is the result of repeatedly hashing the private key sections <Latex>{`$2^w$`}</Latex> times. When signing, the message is first split into <Latex>{`$w$`}</Latex> bit sections. For each section <Latex>{`$i$`}</Latex> with value <Latex>{`$b_i$`}</Latex>, the corresponding secret key is repeatedly hashed <Latex>{`$b_i$`}</Latex> times: <Latex>{`$\{s_i = \\mathsf{H}^{b_i}(sk_i)\}$`}</Latex>. All of these sections  make up the signature. To verify the signature, the message is encoded again and each section is hashed a further <Latex>{`$2^w - b_i$`}</Latex> times. These hashes combined should be equal to the public key.
        </p>
        <Latex>{`$$\\mathsf{H}^{2^w - b_i}(s_i) \\overset{?}{=} \\mathsf{H}^{2^w - b_i}(\\mathsf{H}^{b_i}(sk_i)) = \\mathsf{H}^{2^w}(sk_i) = pk_i$$`}</Latex>
        <p>
            It's easy for anyone to find blocks later in the hash chain, but as it's hard to find a preimage of the hash function, it's hard to find a block earlier in the chain.
        </p>
        
        <p>
            Here is a diagram showing a signature for the binary message <Latex>{`$10000111$`}</Latex>   
        </p>
        
        <img className="m-6 mx-auto dark:invert" alt="hash chains used in WOTS" src={WOTSChains} />

        <p className="pb-4">
            It's split into smaller blocks (with <Latex>{`$w = 2$`}</Latex>), with each block value corresponding to the number of times the secret key is hashed. For this message the signature would be <Latex>{`$s = h2_0 || sk_1 || h1_2 || h3_3$`}</Latex>. When verifying the signature, the chains are hashed corresponding to the message blocks, and allows the public key to be calculated. If the message doesn't match then at least one block won't match the published public key.
        </p>

        <p>
            It's important that the message has a checksum appended to it to prevent forgeries. The checksum is created such that increasing any block of the message would require decreasing at least one block in the checksum. This prevents the forgery of messages where each block is strictly larger than the corresponding block in the original message (as it's impossible to have this and a valid checksum). In the example above it's easy to create a signature for the binary message <Latex>{`$11011011$`}</Latex> after observing the original signature, but this new message cannot pass the checksum.
        </p>
        <p className="pt-2">
            If multiple messages are signed with the same WOTS key pair, the security of the scheme is reduced. This is because an attacker can forge each block of the message as long as it's greater than the smallest observed across all the signatures. With multiple signatures the checksum no longer prevents forgeries.
        </p>

        <h3 className="text-2xl pt-4">Merkle Trees</h3>
        <p>
            Merkle Trees provide a way to combine multiple public keys into a single public key. This is particularly useful for one time signature schemes as only one public key needs to be published in order to verify multiple signatures. In the context of this project, each Merkle tree is used to combine <Latex>{`$16$`}</Latex> public keys into a single public key (for a given set of <Sphincs /> parameters).
        </p>
        <img className="m-6 mx-auto dark:invert" alt="Merkle tree diagam" src={MerkleTree1} />
        <p>
            A Merkle Tree is a full binary tree. The root node is used as the combined public key, and each leaf node is the public key for a WOTS key pair. Each parent node is the hash of its two children nodes. This means it's easy to calculate the parent node of two children, but hard to find two children whose parent is equal to a given value.
        </p>
        <img className="m-6 mx-auto dark:invert" alt="Merkle tree diagam" src={MerkleTree2} />
        <p>
            When creating a signature, a fresh WOTS key pair (whose public key is a leaf node in the tree) is used. The signature is extended with a list of off-path nodes between the corresponding leaf node and the root. When verifying, the verifier calculates the leaf's public key and uses the off-path nodes to calculate the root of the tree. If the signature is correct then the leaf's public key will match the expected leaf's public key. Then if the off-path nodes are correct the root of the tree will match the expected root. As the off-path nodes are used as input to the hashing function to calculate parent nodes, forging the path requires finding a preimage of the hash function, which is assumed to be hard.
        </p>
        <p className="py-2">
            This uses implicit verification to ensure the signature is valid. The WOTS public key isn't directly checked for equality, but after a set of one way computations, it's extremely likely the WOTS public key matched for the result of the computations to match.
        </p>
        <p className="pt-2">
            The signer is still required to pre-compute all of the public keys (in order to calculate off-path node values), however, only one public key is needed to verify multiple signatures. The signature is slightly larger as it includes the off-path nodes, but this is only a <Latex>{`$O(\\log(n))$`}</Latex> bit increase (for  <Latex>{`$n$`}</Latex> possible signatures).
        </p>
        <h3 className="text-2xl pt-4"><Sphincs /> Hyper Tree</h3>
        <p>
            Multiple Merkle Trees can be combined to create a hypertree (a tree of trees). Each leaf node in a Merkle Tree can be used to sign the public key of a tree below it. As there are multiple public keys in each tree, each layer of the hypertree has <Latex>{`$16$`}</Latex> times as many public keys as the layer above it. The <Sphincs /> hypertree is made large enough so that the total number of leaf nodes is sufficiently large. This makes it infeasible to store the entire hypertree. During signing, only trees which are in the path from the given leaf node to the root of the tree need to be fully calculated and they are derived pseudo-randomly using a secret seed. 
        </p>
        <p>
            The hypertree is so large that during signing, the leaf node used to sign a message can be picked randomly. The probability of the same leaf being picked multiple times is small. Additionally, the bottom most leaf nodes use a few time signature scheme so that in the event of the same leaf node being used multiple times, the security of the scheme is not compromised.
        </p>
        <h3 className="text-2xl pt-4">Fault Injection Attack</h3>
        <p>
            Fault injection attacks extract secret information by purposefully causing a fault to occur during the signing process. Genêt, J. Kannwischer Pelletier, and McLauchlan describe a fault injection attack on SPHINCS in "Practical Fault Injection Attacks on SPHINCS" <ReferenceLink num={1} />. This is the scheme <Sphincs /> is based on, and the attack can be adapted to work on <Sphincs />. When computing the Merkle tree a fault is caused, resulting in a WOTS signature being used to sign an additional message (the malformed public key). SPHINCS is constructed similarly to <Sphincs /> with a leaf node deterministically chosen to sign each message (in comparison the <Sphincs /> leaf node is randomly picked). The same message can be requested to be signed and a fault injected in the calculation. If the fault causes a malformed public key to be signed, the attacker gains information about the hash chains used to calculate a WOTS public key. Once enough of this information is gathered, the attacker can create a valid signature with their own secret key, and "graft" it onto the original signature. This allows the attacker to forge a signature for a message of their choosing which can be verified by the public key.
        </p>
        <p className="pt-2">
            Genêt et al. suggest a modification that can be made to the attack making it suitable for <Sphincs />. As the leaf node is randomly picked, the path to the root node is likely to be different each time. Instead, we target one of the leaf nodes in the upper most tree. Every time a signature is created its path must pass through one of the <Latex>{`$16$`}</Latex> leaf nodes. If the correct upper most leaf node is used in a faulty signature then the attack can be carried out as usual. Otherwise, the signature is not used in forging a message.
        </p>

        <img className="dark:invert mx-auto mt-8 mb-2 max-w-3xl w-full" src={GraftTree} alt="a hyper tree with a grafted path added" />

        <h3 className="text-2xl pt-4">Attack Breakdown</h3>
        <ul className="list-disc pl-8">
            <li>First a signature is signed without a fault. This allows the upper most WOTS public key to be recovered.</li>
            <li>Next faulty signatures are repeatedly made. It uses the same message as before (though this is not required) and discards any signatures which use a different upper most WOTS key pair as the valid signature. The signatures' hash chains can be extended until they match the derived public key, and the maximum number of hashes required is maintained. This follows the usual WOTS repeated use attack, with the earliest hash in the hash chain across all signatures calculated.</li>
            <li>After enough signatures have been faultily signed and processed (this is decided by the user in my initial implementation) a message is randomly chosen to create a forgery with. A random <Sphincs /> key pair is created and used to sign this new message. From the resulting signature, the public key signed by the upper most WOTS key is calculated. If each block of this is greater than the minimum observed in the previous step then a signature can be made which will verify this message with the target public key. If each block isn't greater a new <Sphincs /> then key pair is generated and the process repeats</li>
            <li>Finally, the lower part of the adversary's <Sphincs /> signature is combined with the upper part of the target <Sphincs /> signature to create a valid forgery. It's verified with the target public key for completeness.</li>
        </ul>
        <p className="pt-4">
            These steps allow any message to be forged after the adversary observes enough faulty signatures. My implementation of the attack was written in Go, using a fork of the <Sphincs /> Go implementation, with additional code to create faulty signatures targeting the correct level of the tree (in practice the level of the tree can be targeted with precise timing, resulting in a realistic attack even if the number of attempted forgeries is higher). To validate the attack, a Go routine was created for signing faulty and non faulty messages. This ensures the private key used in signing is out of scope from the attack, and only the public key, access to a signing oracle, and access to a faultily signing oracle is provided.
        </p>
    </div>
}

function SectionTwo() {
    return <div className="pt-12">
        <h2 className="text-4xl" id="section-two">Section Two - <Sphincs /> Attack Analysis and Parallel Attack</h2>
        <br />
        <p>
            Genêt et al. analyse the number of faulty signatures required to forge a message. The attack can be split into two halves: creating and processing faulty signatures, and attempting to graft a tree to create a valid signature. The larger the amount of both, the higher the probability a valid forgery can be created. Creating faulty signatures is assumed to be harder, as they require access to the system (represented as a signing oracles in this case) and are unreliable (due to faults only being useful if they fall within the correct layer). Creating the forgery after the preprocessing is assumed to be easier, as it can be done offline and doesn't require access to the system.
        </p>

        <img className="dark:invert mx-auto mt-4 mb-2 max-w-xl w-full" src={oneForgeFaults} alt="Forge success probability. Success vs number of faulty signatures observed. taken from reference [1]" />
        <p className="text-center">
            Success rate of the WOTS+ forgery with <Latex>{`$n = 256$`}</Latex> and <Latex>{`$w = 16$`}</Latex> using a single forgery attempt. The simulated success probability is slightly lower than the approximation due to the checksum. Taken from <ReferenceLink num={1} />
        </p>
        <p className="pt-4">
            This graph shows the success rate of a forgery against SPHINCS being successful when a single forgery attempt is made after <Latex>{`$q$`}</Latex> faulty signatures are processed (importantly, this is only for faulty signatures where the fault occurred in the correct hypertree layer). In theory the success rate against <Sphincs /> should be similar, but with <Latex>{`$16$`}</Latex> times as many signatures required, as only <Latex>{`$1$`}</Latex> in <Latex>{`$16$`}</Latex> will target the correct <span className="whitespace-nowrap">sub-tree</span>. To check this assumption to be correct, I recreated this graph using the same parameter set, but with my attack on <Sphincs /> instead of SPHINCS. This is done by first creating signature to be grafted, and recording how many faulty signatures are required before a valid forgery can be made. The success probability is then calculated as the percentage of successful forgeries that occur with less than <Latex>{`$q$`}</Latex> faulty signatures.
        </p>

        <img className="dark:invert mx-auto my-4 max-w-xl w-full" src={myOneFaultFaults} alt="forge success probability. Success vs number of faulty signatures observed. result on SPHINCS-PLUS" />

        <p>
            Above are the results of attempting 700 forgeries and recording the minimum number of faulty signatures required before a successful forgery could occur. As expected, the graph looks identical, but with the <Latex>{`$x$`}</Latex> axis scaled by <Latex>{`$16$`}</Latex>.
        </p>

        <h3 className="text-2xl pt-8">Parallel Attack</h3>
        <p>
            In the above attack, only <Latex>{`$1$`}</Latex> in <Latex>{`$16$`}</Latex> faulty signatures provide any additional information and the rest are discarded. This leads to wasted information which could be leveraged to make the attack more efficient. In the first version, we observe a single correct signature and target its subtree. Instead we could record multiple correct signatures until we have one for each of the <Latex>{`$16$`}</Latex> subtrees. We then effectively run the same attack <Latex>{`$16$`}</Latex> times as each signature's leaked information is used to assist in creating a forgery. This attack does add the extra assumption that a signature using each subtree is observed, but this is likely to be the case in practice.
        </p>
        <p className="pt-2">
            Genêt et al. also analyse the number of forgery attempts before a valid forgery is made. They compare the probability of a forgery being valid within p forgery attempts, after preprocessing q faulty signatures. In the single subtree attack, the number of forgery attempts is likely to be simply <Latex>{`$16$`}</Latex> times and otherwise identical. However in the parallel attack, the probability of a forgery being successful is greater as each forgery attempt doesn't have to target the correct subtree as well as being able to be forged with the hash chains.
        </p>

        <img className="dark:invert mx-auto mt-4 max-w-xl w-full" src={numFaultComparison} alt="Forge success probability. Success vs number of forgery attempts made for differing amounts of faulty signatures observed. result on SPHINCS" />
        <p className="text-center pb-2">
            Simulated success probability of the tree grafting attack given q faulty signatures against SPHINCS. By investing more computational power (p) the adversary can forge signatures with fewer faulty signatures. Taken from <ReferenceLink num={1} />
        </p>

        <p className="pt-4">
            Forgery attempts are a lot cheaper, as they don't require access to the system and can be done offline. They can be easily parallelised as only one success is required to produce a valid forgery.
        </p>
        <p>
            When collecting data for the parallel attack on <Sphincs /> I scaled the number of faulty signatures by <Latex>{`$16$`}</Latex> (so each subtree has the same expected number of faulty signatures q as in the graph above). I also increased the maximum number of forgery attempts to <Latex>{`$400$`}</Latex> as these can be easily made by a single thread in under 2 minutes. These results are for <Latex>{`$158$`}</Latex> forgeries for each of the value of <Latex>{`$q$`}</Latex>.
        </p>

        <img className="dark:invert mx-auto my-4 max-w-xl w-full" src={myNumFaultComparison} alt="Forge success probability. Success vs number of forgery attempts made for differing amounts of faulty signatures observed. result on SPHINCS-PLUS" />
        
        <p>
            It's clear to see that the probability of a forgery being successful follows has a similar shape as SPHINCS. We can see that for each number of faulty signatures <Latex>{`$q$`}</Latex>, the success probability is greater than the corresponding <Latex>{`$q$`}</Latex> for the SPHINCS experiment. This suggests that the parallel attack is more efficient than the single subtree attack, as you can get a probability similar to that in SPHINCS with less than <Latex>{`$16$`}</Latex> times the number of faulty signatures. (This still requires more than SPHINCS)
        </p>

        <img className="dark:invert mx-auto my-4 max-w-xl w-full" src={myNumFaultComparison2} alt="Forge success probability. Success vs number of forgery attempts made for differing amounts of faulty signatures observed - with greater number of forgery attempts made. result on SPHINCS" />

        <p>
            We can also see that when considering a number greater of forgery attempts, <Latex>{`$q = 128$`}</Latex> is still large enough to have a significant chance of creating a valid forgery. With optimisation and multi-threading the attack could be made much more efficient. This suggests <Latex>{`$q$`}</Latex> could be reduced further with the attack still being successful.
        </p>

    </div>
}

export default Content;