const AntSimBlur = `<pre class="syntax--editor syntax--editor-colors"><div class="line" data-screen-row="0"><span class=""><span class="syntax--source syntax--c"><span class="syntax--comment syntax--block">// stores the data once blured in the horizontal direction</span></span></span></div><div class="line" data-screen-row="1"><span class=""><span class="syntax--source syntax--c"><span class="syntax--support syntax--storage syntax--type">guchar</span> <span class="syntax--keyword syntax--operator">*</span>hBlur <span class="syntax--keyword syntax--operator">=</span> <span class="syntax--entity syntax--name syntax--function">malloc</span><span class="syntax--punctuation syntax--section syntax--parens syntax--begin syntax--bracket syntax--round">(</span>s<span class="syntax--keyword syntax--operator syntax--member">-&gt;</span><span class="syntax--variable syntax--other syntax--member">width</span> <span class="syntax--keyword syntax--operator">*</span> s<span class="syntax--keyword syntax--operator syntax--member">-&gt;</span><span class="syntax--variable syntax--other syntax--member">height</span> <span class="syntax--keyword syntax--operator">*</span> <span class="syntax--constant syntax--numeric syntax--decimal">3</span> <span class="syntax--keyword syntax--operator">*</span> <span class="syntax--keyword syntax--operator syntax--sizeof">sizeof</span><span class="syntax--punctuation syntax--section syntax--parens syntax--begin syntax--bracket syntax--round">(</span>guchar<span class="syntax--punctuation syntax--section syntax--parens syntax--end syntax--bracket syntax--round">)</span><span class="syntax--punctuation syntax--section syntax--parens syntax--end syntax--bracket syntax--round">)</span><span class="syntax--punctuation syntax--terminator syntax--statement">;</span></span></span></div><div class="line" data-screen-row="2"><span class=""><span class="syntax--source syntax--c"><span class="syntax--keyword syntax--control">for</span> <span class="syntax--punctuation syntax--section syntax--parens syntax--begin syntax--bracket syntax--round">(</span><span class="syntax--support syntax--storage syntax--type">int</span> y <span class="syntax--keyword syntax--operator">=</span> <span class="syntax--constant syntax--numeric syntax--decimal">0</span><span class="syntax--punctuation syntax--terminator syntax--statement">;</span> y <span class="syntax--keyword syntax--operator">&lt;</span> s<span class="syntax--keyword syntax--operator syntax--member">-&gt;</span><span class="syntax--variable syntax--other syntax--member">height</span><span class="syntax--punctuation syntax--terminator syntax--statement">;</span> y<span class="syntax--keyword syntax--operator">++</span><span class="syntax--punctuation syntax--section syntax--parens syntax--end syntax--bracket syntax--round">)</span> <span class="syntax--punctuation syntax--section syntax--block syntax--begin syntax--bracket syntax--curly">{</span> <span class="syntax--comment syntax--block">// blurs in the horizontal direction</span></span></span></div><div class="line" data-screen-row="3"><span class=""><span class="syntax--source syntax--c"><span class="leading-whitespace">    </span><span class="syntax--keyword syntax--control">for</span> <span class="syntax--punctuation syntax--section syntax--parens syntax--begin syntax--bracket syntax--round">(</span><span class="syntax--support syntax--storage syntax--type">int</span> x <span class="syntax--keyword syntax--operator">=</span> <span class="syntax--constant syntax--numeric syntax--decimal">0</span><span class="syntax--punctuation syntax--terminator syntax--statement">;</span> x <span class="syntax--keyword syntax--operator">&lt;</span> s<span class="syntax--keyword syntax--operator syntax--member">-&gt;</span><span class="syntax--variable syntax--other syntax--member">width</span><span class="syntax--punctuation syntax--terminator syntax--statement">;</span> x<span class="syntax--keyword syntax--operator">++</span><span class="syntax--punctuation syntax--section syntax--parens syntax--end syntax--bracket syntax--round">)</span> <span class="syntax--punctuation syntax--section syntax--block syntax--begin syntax--bracket syntax--curly">{</span></span></span></div><div class="line" data-screen-row="4"><span class=""><span class="syntax--source syntax--c"><span class="leading-whitespace">        </span><span class="syntax--support syntax--storage syntax--type">int</span> total <span class="syntax--keyword syntax--operator">=</span> <span class="syntax--constant syntax--numeric syntax--decimal">0</span><span class="syntax--punctuation syntax--terminator syntax--statement">;</span></span></span></div><div class="line" data-screen-row="5"><span class=""><span class="syntax--source syntax--c"><span class="leading-whitespace">        </span><span class="syntax--keyword syntax--control">for</span> <span class="syntax--punctuation syntax--section syntax--parens syntax--begin syntax--bracket syntax--round">(</span><span class="syntax--support syntax--storage syntax--type">int</span> dx <span class="syntax--keyword syntax--operator">=</span> <span class="syntax--keyword syntax--operator">-</span>r<span class="syntax--punctuation syntax--terminator syntax--statement">;</span> dx <span class="syntax--keyword syntax--operator">&lt;=</span> r<span class="syntax--punctuation syntax--terminator syntax--statement">;</span> dx<span class="syntax--keyword syntax--operator">++</span><span class="syntax--punctuation syntax--section syntax--parens syntax--end syntax--bracket syntax--round">)</span> <span class="syntax--punctuation syntax--section syntax--block syntax--begin syntax--bracket syntax--curly">{</span></span></span></div><div class="line" data-screen-row="6"><span class=""><span class="syntax--source syntax--c"><span class="leading-whitespace">            </span><span class="syntax--support syntax--storage syntax--type">int</span> xpos <span class="syntax--keyword syntax--operator">=</span> <span class="syntax--punctuation syntax--section syntax--parens syntax--begin syntax--bracket syntax--round">(</span>x <span class="syntax--keyword syntax--operator">+</span> dx <span class="syntax--keyword syntax--operator">+</span> s<span class="syntax--keyword syntax--operator syntax--member">-&gt;</span><span class="syntax--variable syntax--other syntax--member">width</span><span class="syntax--punctuation syntax--section syntax--parens syntax--end syntax--bracket syntax--round">)</span> <span class="syntax--keyword syntax--operator">%</span> s<span class="syntax--keyword syntax--operator syntax--member">-&gt;</span><span class="syntax--variable syntax--other syntax--member">width</span><span class="syntax--punctuation syntax--terminator syntax--statement">;</span></span></span></div><div class="line" data-screen-row="7"><span class=""><span class="syntax--source syntax--c"><span class="leading-whitespace">            </span>total <span class="syntax--keyword syntax--operator">+=</span> s<span class="syntax--keyword syntax--operator syntax--member">-&gt;</span><span class="syntax--variable syntax--other syntax--member">data</span><span class="syntax--punctuation syntax--definition syntax--begin syntax--bracket syntax--square">[</span><span class="syntax--constant syntax--numeric syntax--decimal">3</span><span class="syntax--keyword syntax--operator">*</span><span class="syntax--punctuation syntax--section syntax--parens syntax--begin syntax--bracket syntax--round">(</span>y<span class="syntax--keyword syntax--operator">*</span>s<span class="syntax--keyword syntax--operator syntax--member">-&gt;</span><span class="syntax--variable syntax--other syntax--member">width</span><span class="syntax--keyword syntax--operator">+</span>xpos<span class="syntax--punctuation syntax--section syntax--parens syntax--end syntax--bracket syntax--round">)</span><span class="syntax--keyword syntax--operator">+</span>c<span class="syntax--punctuation syntax--definition syntax--end syntax--bracket syntax--square">]</span><span class="syntax--punctuation syntax--terminator syntax--statement">;</span></span></span></div><div class="line" data-screen-row="8"><span class=""><span class="syntax--source syntax--c"><span class="leading-whitespace">        </span><span class="syntax--punctuation syntax--section syntax--block syntax--end syntax--bracket syntax--curly">}</span></span></span></div><div class="line" data-screen-row="9"><span class=""><span class="syntax--source syntax--c"><span class="leading-whitespace">        </span>hBlur<span class="syntax--punctuation syntax--definition syntax--begin syntax--bracket syntax--square">[</span><span class="syntax--constant syntax--numeric syntax--decimal">3</span><span class="syntax--keyword syntax--operator">*</span><span class="syntax--punctuation syntax--section syntax--parens syntax--begin syntax--bracket syntax--round">(</span>y<span class="syntax--keyword syntax--operator">*</span>s<span class="syntax--keyword syntax--operator syntax--member">-&gt;</span><span class="syntax--variable syntax--other syntax--member">width</span><span class="syntax--keyword syntax--operator">+</span>x<span class="syntax--punctuation syntax--section syntax--parens syntax--end syntax--bracket syntax--round">)</span><span class="syntax--keyword syntax--operator">+</span>c<span class="syntax--punctuation syntax--definition syntax--end syntax--bracket syntax--square">]</span> <span class="syntax--keyword syntax--operator">=</span> total <span class="syntax--keyword syntax--operator">/</span> <span class="syntax--punctuation syntax--section syntax--parens syntax--begin syntax--bracket syntax--round">(</span><span class="syntax--constant syntax--numeric syntax--decimal">2</span><span class="syntax--keyword syntax--operator">*</span>r<span class="syntax--keyword syntax--operator">+</span><span class="syntax--constant syntax--numeric syntax--decimal">1</span><span class="syntax--punctuation syntax--section syntax--parens syntax--end syntax--bracket syntax--round">)</span><span class="syntax--punctuation syntax--terminator syntax--statement">;</span></span></span></div><div class="line" data-screen-row="10"><span class=""><span class="syntax--source syntax--c"><span class="leading-whitespace">    </span><span class="syntax--punctuation syntax--section syntax--block syntax--end syntax--bracket syntax--curly">}</span></span></span></div><div class="line" data-screen-row="11"><span class=""><span class="syntax--source syntax--c"><span class="syntax--punctuation syntax--section syntax--block syntax--end syntax--bracket syntax--curly">}</span></span></span></div><div class="line" data-screen-row="12"><span class=""><span class="syntax--source syntax--c"><span class="syntax--keyword syntax--control">for</span> <span class="syntax--punctuation syntax--section syntax--parens syntax--begin syntax--bracket syntax--round">(</span><span class="syntax--support syntax--storage syntax--type">int</span> x <span class="syntax--keyword syntax--operator">=</span> <span class="syntax--constant syntax--numeric syntax--decimal">0</span><span class="syntax--punctuation syntax--terminator syntax--statement">;</span> x <span class="syntax--keyword syntax--operator">&lt;</span> s<span class="syntax--keyword syntax--operator syntax--member">-&gt;</span><span class="syntax--variable syntax--other syntax--member">width</span><span class="syntax--punctuation syntax--terminator syntax--statement">;</span> x<span class="syntax--keyword syntax--operator">++</span><span class="syntax--punctuation syntax--section syntax--parens syntax--end syntax--bracket syntax--round">)</span> <span class="syntax--punctuation syntax--section syntax--block syntax--begin syntax--bracket syntax--curly">{</span> <span class="syntax--comment syntax--block">// blurs in the vertical direction</span></span></span></div><div class="line" data-screen-row="13"><span class=""><span class="syntax--source syntax--c"><span class="leading-whitespace">    </span><span class="syntax--keyword syntax--control">for</span> <span class="syntax--punctuation syntax--section syntax--parens syntax--begin syntax--bracket syntax--round">(</span><span class="syntax--support syntax--storage syntax--type">int</span> y <span class="syntax--keyword syntax--operator">=</span> <span class="syntax--constant syntax--numeric syntax--decimal">0</span><span class="syntax--punctuation syntax--terminator syntax--statement">;</span> y <span class="syntax--keyword syntax--operator">&lt;</span> s<span class="syntax--keyword syntax--operator syntax--member">-&gt;</span><span class="syntax--variable syntax--other syntax--member">height</span><span class="syntax--punctuation syntax--terminator syntax--statement">;</span> y<span class="syntax--keyword syntax--operator">++</span><span class="syntax--punctuation syntax--section syntax--parens syntax--end syntax--bracket syntax--round">)</span> <span class="syntax--punctuation syntax--section syntax--block syntax--begin syntax--bracket syntax--curly">{</span></span></span></div><div class="line" data-screen-row="14"><span class=""><span class="syntax--source syntax--c"><span class="leading-whitespace">        </span><span class="syntax--support syntax--storage syntax--type">int</span> total <span class="syntax--keyword syntax--operator">=</span> <span class="syntax--constant syntax--numeric syntax--decimal">0</span><span class="syntax--punctuation syntax--terminator syntax--statement">;</span></span></span></div><div class="line" data-screen-row="15"><span class=""><span class="syntax--source syntax--c"><span class="leading-whitespace">        </span><span class="syntax--keyword syntax--control">for</span> <span class="syntax--punctuation syntax--section syntax--parens syntax--begin syntax--bracket syntax--round">(</span><span class="syntax--support syntax--storage syntax--type">int</span> dy <span class="syntax--keyword syntax--operator">=</span> <span class="syntax--keyword syntax--operator">-</span>r<span class="syntax--punctuation syntax--terminator syntax--statement">;</span> dy <span class="syntax--keyword syntax--operator">&lt;=</span> r<span class="syntax--punctuation syntax--terminator syntax--statement">;</span> dy<span class="syntax--keyword syntax--operator">++</span><span class="syntax--punctuation syntax--section syntax--parens syntax--end syntax--bracket syntax--round">)</span> <span class="syntax--punctuation syntax--section syntax--block syntax--begin syntax--bracket syntax--curly">{</span></span></span></div><div class="line" data-screen-row="16"><span class=""><span class="syntax--source syntax--c"><span class="leading-whitespace">            </span><span class="syntax--support syntax--storage syntax--type">int</span> ypos <span class="syntax--keyword syntax--operator">=</span> <span class="syntax--punctuation syntax--section syntax--parens syntax--begin syntax--bracket syntax--round">(</span>y <span class="syntax--keyword syntax--operator">+</span> dy <span class="syntax--keyword syntax--operator">+</span> s<span class="syntax--keyword syntax--operator syntax--member">-&gt;</span><span class="syntax--variable syntax--other syntax--member">height</span><span class="syntax--punctuation syntax--section syntax--parens syntax--end syntax--bracket syntax--round">)</span> <span class="syntax--keyword syntax--operator">%</span> s<span class="syntax--keyword syntax--operator syntax--member">-&gt;</span><span class="syntax--variable syntax--other syntax--member">height</span><span class="syntax--punctuation syntax--terminator syntax--statement">;</span></span></span></div><div class="line" data-screen-row="17"><span class=""><span class="syntax--source syntax--c"><span class="leading-whitespace">            </span>total <span class="syntax--keyword syntax--operator">+=</span> hBlur<span class="syntax--punctuation syntax--definition syntax--begin syntax--bracket syntax--square">[</span><span class="syntax--constant syntax--numeric syntax--decimal">3</span><span class="syntax--keyword syntax--operator">*</span><span class="syntax--punctuation syntax--section syntax--parens syntax--begin syntax--bracket syntax--round">(</span>ypos<span class="syntax--keyword syntax--operator">*</span>s<span class="syntax--keyword syntax--operator syntax--member">-&gt;</span><span class="syntax--variable syntax--other syntax--member">width</span><span class="syntax--keyword syntax--operator">+</span>x<span class="syntax--punctuation syntax--section syntax--parens syntax--end syntax--bracket syntax--round">)</span><span class="syntax--keyword syntax--operator">+</span>c<span class="syntax--punctuation syntax--definition syntax--end syntax--bracket syntax--square">]</span><span class="syntax--punctuation syntax--terminator syntax--statement">;</span></span></span></div><div class="line" data-screen-row="18"><span class=""><span class="syntax--source syntax--c"><span class="leading-whitespace">        </span><span class="syntax--punctuation syntax--section syntax--block syntax--end syntax--bracket syntax--curly">}</span></span></span></div><div class="line" data-screen-row="19"><span class=""><span class="syntax--source syntax--c"><span class="leading-whitespace">        </span>s<span class="syntax--keyword syntax--operator syntax--member">-&gt;</span><span class="syntax--variable syntax--other syntax--member">data</span><span class="syntax--punctuation syntax--definition syntax--begin syntax--bracket syntax--square">[</span><span class="syntax--constant syntax--numeric syntax--decimal">3</span><span class="syntax--keyword syntax--operator">*</span><span class="syntax--punctuation syntax--section syntax--parens syntax--begin syntax--bracket syntax--round">(</span>y<span class="syntax--keyword syntax--operator">*</span>s<span class="syntax--keyword syntax--operator syntax--member">-&gt;</span><span class="syntax--variable syntax--other syntax--member">width</span><span class="syntax--keyword syntax--operator">+</span>x<span class="syntax--punctuation syntax--section syntax--parens syntax--end syntax--bracket syntax--round">)</span><span class="syntax--keyword syntax--operator">+</span>c<span class="syntax--punctuation syntax--definition syntax--end syntax--bracket syntax--square">]</span> <span class="syntax--keyword syntax--operator">=</span> total <span class="syntax--keyword syntax--operator">/</span> <span class="syntax--punctuation syntax--section syntax--parens syntax--begin syntax--bracket syntax--round">(</span><span class="syntax--punctuation syntax--section syntax--parens syntax--begin syntax--bracket syntax--round">(</span><span class="syntax--constant syntax--numeric syntax--decimal">2</span><span class="syntax--keyword syntax--operator">*</span>r<span class="syntax--keyword syntax--operator">+</span><span class="syntax--constant syntax--numeric syntax--decimal">1</span><span class="syntax--punctuation syntax--section syntax--parens syntax--end syntax--bracket syntax--round">)</span> <span class="syntax--keyword syntax--operator">*</span> blurReductionFactor<span class="syntax--punctuation syntax--section syntax--parens syntax--end syntax--bracket syntax--round">)</span><span class="syntax--punctuation syntax--terminator syntax--statement">;</span></span></span></div><div class="line" data-screen-row="20"><span class=""><span class="syntax--source syntax--c"><span class="leading-whitespace">    </span><span class="syntax--punctuation syntax--section syntax--block syntax--end syntax--bracket syntax--curly">}</span></span></span></div><div class="line" data-screen-row="21"><span class=""><span class="syntax--source syntax--c"><span class="syntax--punctuation syntax--section syntax--block syntax--end syntax--bracket syntax--curly">}</span></span></span></div></pre>`;

export {AntSimBlur};