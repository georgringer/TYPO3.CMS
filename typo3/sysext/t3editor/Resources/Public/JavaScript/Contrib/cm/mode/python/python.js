!function(e){"object"==typeof exports&&"object"==typeof module?e(require("../../lib/codemirror")):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],e):e(CodeMirror)}(function(e){"use strict";function t(e){return new RegExp("^(("+e.join(")|(")+"))\\b")}var n=t(["and","or","not","is"]),r=["as","assert","break","class","continue","def","del","elif","else","except","finally","for","from","global","if","import","lambda","pass","raise","return","try","while","with","yield","in"],i=["abs","all","any","bin","bool","bytearray","callable","chr","classmethod","compile","complex","delattr","dict","dir","divmod","enumerate","eval","filter","float","format","frozenset","getattr","globals","hasattr","hash","help","hex","id","input","int","isinstance","issubclass","iter","len","list","locals","map","max","memoryview","min","next","object","oct","open","ord","pow","property","range","repr","reversed","round","set","setattr","slice","sorted","staticmethod","str","sum","super","tuple","type","vars","zip","__import__","NotImplemented","Ellipsis","__debug__"];function o(e){return e.scopes[e.scopes.length-1]}e.registerHelper("hintWords","python",r.concat(i)),e.defineMode("python",function(a,s){for(var c="error",l=s.delimiters||s.singleDelimiters||/^[\(\)\[\]\{\}@,:`=;\.\\]/,u=[s.singleOperators,s.doubleOperators,s.doubleDelimiters,s.tripleDelimiters,s.operators||/^([-+*\/%\/&|^]=?|[<>=]+|\/\/=?|\*\*=?|!=|[~!@])/],f=0;f<u.length;f++)u[f]||u.splice(f--,1);var p=s.hangingIndent||a.indentUnit,d=r,m=i;null!=s.extra_keywords&&(d=d.concat(s.extra_keywords)),null!=s.extra_builtins&&(m=m.concat(s.extra_builtins));var h=!(s.version&&Number(s.version)<3);if(h){var b=s.identifiers||/^[_A-Za-z\u00A1-\uFFFF][_A-Za-z0-9\u00A1-\uFFFF]*/;d=d.concat(["nonlocal","False","True","None","async","await"]),m=m.concat(["ascii","bytes","exec","print"]);var y=new RegExp("^(([rbuf]|(br)|(fr))?('{3}|\"{3}|['\"]))","i")}else{b=s.identifiers||/^[_A-Za-z][_A-Za-z0-9]*/;d=d.concat(["exec","print"]),m=m.concat(["apply","basestring","buffer","cmp","coerce","execfile","file","intern","long","raw_input","reduce","reload","unichr","unicode","xrange","False","True","None"]);y=new RegExp("^(([rubf]|(ur)|(br))?('{3}|\"{3}|['\"]))","i")}var g=t(d),k=t(m);function x(e,t){var n=e.sol()&&"\\"!=t.lastToken;if(n&&(t.indent=e.indentation()),n&&"py"==o(t).type){var r=o(t).offset;if(e.eatSpace()){var i=e.indentation();return i>r?_(t):i<r&&z(e,t)&&"#"!=e.peek()&&(t.errorToken=!0),null}var a=v(e,t);return r>0&&z(e,t)&&(a+=" "+c),a}return v(e,t)}function v(e,t){if(e.eatSpace())return null;if(e.match(/^#.*/))return"comment";if(e.match(/^[0-9\.]/,!1)){var r=!1;if(e.match(/^[\d_]*\.\d+(e[\+\-]?\d+)?/i)&&(r=!0),e.match(/^[\d_]+\.\d*/)&&(r=!0),e.match(/^\.\d+/)&&(r=!0),r)return e.eat(/J/i),"number";var i=!1;if(e.match(/^0x[0-9a-f_]+/i)&&(i=!0),e.match(/^0b[01_]+/i)&&(i=!0),e.match(/^0o[0-7_]+/i)&&(i=!0),e.match(/^[1-9][\d_]*(e[\+\-]?[\d_]+)?/)&&(e.eat(/J/i),i=!0),e.match(/^0(?![\dx])/i)&&(i=!0),i)return e.eat(/L/i),"number"}if(e.match(y))return-1!==e.current().toLowerCase().indexOf("f")?(t.tokenize=function(e,t){for(;"rubf".indexOf(e.charAt(0).toLowerCase())>=0;)e=e.substr(1);var n=1==e.length,r="string";function i(t,n){return t.match(e)?(n.tokenize=o,r):t.match("{")?"punctuation":t.match("}")?(n.tokenize=o,"punctuation"):v(t,n)}function o(o,a){for(;!o.eol();)if(o.eatWhile(/[^'"\{\}\\]/),o.eat("\\")){if(o.next(),n&&o.eol())return r}else{if(o.match(e))return a.tokenize=t,r;if(o.match("{{"))return r;if(o.match("{",!1))return a.tokenize=i,o.current()?r:(o.next(),"punctuation");if(o.match("}}"))return r;if(o.match("}"))return c;o.eat(/['"]/)}if(n){if(s.singleLineStringErrors)return c;a.tokenize=t}return r}return o.isString=!0,o}(e.current(),t.tokenize),t.tokenize(e,t)):(t.tokenize=function(e){for(;"rubf".indexOf(e.charAt(0).toLowerCase())>=0;)e=e.substr(1);var t=1==e.length,n="string";function r(r,i){for(;!r.eol();)if(r.eatWhile(/[^'"\\]/),r.eat("\\")){if(r.next(),t&&r.eol())return n}else{if(r.match(e))return i.tokenize=x,n;r.eat(/['"]/)}if(t){if(s.singleLineStringErrors)return c;i.tokenize=x}return n}return r.isString=!0,r}(e.current()),t.tokenize(e,t));for(var o=0;o<u.length;o++)if(e.match(u[o]))return"operator";return e.match(l)?"punctuation":"."==t.lastToken&&e.match(b)?"property":e.match(g)||e.match(n)?"keyword":e.match(k)?"builtin":e.match(/^(self|cls)\b/)?"variable-2":e.match(b)?"def"==t.lastToken||"class"==t.lastToken?"def":"variable":(e.next(),c)}function _(e){for(;"py"!=o(e).type;)e.scopes.pop();e.scopes.push({offset:o(e).offset+a.indentUnit,type:"py",align:null})}function z(e,t){for(var n=e.indentation();t.scopes.length>1&&o(t).offset>n;){if("py"!=o(t).type)return!0;t.scopes.pop()}return o(t).offset!=n}function w(e,t){e.sol()&&(t.beginningOfLine=!0);var n=t.tokenize(e,t),r=e.current();if(t.beginningOfLine&&"@"==r)return e.match(b,!1)?"meta":h?"operator":c;if(/\S/.test(r)&&(t.beginningOfLine=!1),"variable"!=n&&"builtin"!=n||"meta"!=t.lastToken||(n="meta"),"pass"!=r&&"return"!=r||(t.dedent+=1),"lambda"==r&&(t.lambda=!0),":"!=r||t.lambda||"py"!=o(t).type||_(t),1==r.length&&!/string|comment/.test(n)){var i="[({".indexOf(r);if(-1!=i&&function(e,t,n){var r=e.match(/^([\s\[\{\(]|#.*)*$/,!1)?null:e.column()+1;t.scopes.push({offset:t.indent+p,type:n,align:r})}(e,t,"])}".slice(i,i+1)),-1!=(i="])}".indexOf(r))){if(o(t).type!=r)return c;t.indent=t.scopes.pop().offset-p}}return t.dedent>0&&e.eol()&&"py"==o(t).type&&(t.scopes.length>1&&t.scopes.pop(),t.dedent-=1),n}return{startState:function(e){return{tokenize:x,scopes:[{offset:e||0,type:"py",align:null}],indent:e||0,lastToken:null,lambda:!1,dedent:0}},token:function(e,t){var n=t.errorToken;n&&(t.errorToken=!1);var r=w(e,t);return r&&"comment"!=r&&(t.lastToken="keyword"==r||"punctuation"==r?e.current():r),"punctuation"==r&&(r=null),e.eol()&&t.lambda&&(t.lambda=!1),n?r+" "+c:r},indent:function(t,n){if(t.tokenize!=x)return t.tokenize.isString?e.Pass:0;var r=o(t),i=r.type==n.charAt(0);return null!=r.align?r.align-(i?1:0):r.offset-(i?p:0)},electricInput:/^\s*[\}\]\)]$/,closeBrackets:{triples:"'\""},lineComment:"#",fold:"indent"}}),e.defineMIME("text/x-python","python");var a;e.defineMIME("text/x-cython",{name:"python",extra_keywords:(a="by cdef cimport cpdef ctypedef enum except extern gil include nogil property public readonly struct union DEF IF ELIF ELSE",a.split(" "))})});