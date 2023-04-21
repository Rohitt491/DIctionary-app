import { useEffect, useState } from "react"



const Header = () => {
    const [Meaning, SetMeaning] = useState([]);
    const [Def, SetDef] = useState([]);
    const [entr, whenenter] = useState("");
    const [Word, SetWord] = useState("");
    const [Text, Settext] = useState("");
    const [error, Seterror] = useState("");


    let api = "https://api.dictionaryapi.dev/api/v2/entries/en"
    function abc() {
        fetch(`${api}/${entr}`)
            .then(res => res.json())
            .then(data => {
                SetMeaning(data[0].meanings)
                SetDef(data[0].meanings)
                SetWord(data[0].word)
                Settext(data[0].phonetic)
                Seterror("")
                    (data)
            })
            .catch(err => Seterror(err))
    }

    useEffect(() => {
        const debounce = setTimeout(() => {
            abc();
        }, 500);

        return () => clearTimeout(debounce)
    }, [entr]);


    return (
        <div className="header">


            <div className="upperpart">
                <h1 className="title">Simple Dictionary</h1>
                <p>Find Definitions for every word</p>
                <div className="searchbar">
                    <input type="text" placeholder="Search..." onChange={(e) => whenenter(e.target.value)} />
                    <button>Search</button>
                </div>
            </div>

            <div className="lowerpart">
                <h1>{Word.toUpperCase()}</h1>
                <p id="text">{Text}</p>

                {
                    Meaning.map((e, index) => (
                        <div key={index} className="mapdiv">
                            <h2 >{e.partOfSpeech}</h2>
                           <div>
                            <h1>synonms</h1>
                               <ul>
                               {e.synonyms.filter(arrayB => arrayB.length > 0).map((item)=> (
                                      <li>
                                        {item}
                                      </li> 
                            ))}
                               </ul>
                           </div>
                            <div>
                                <h1>antonyms</h1>
                              <ul>
                              {e.antonyms.map((x)=> ( 
                                    <li>{x}</li>
                            ))}
                              </ul>
                            </div>
                                <h1>Meaning</h1>
                            <div>
                                {e.definitions.map(def => (
                                    <p>{def.definition}</p>
                            ))}
                            </div>
                        </div>
                    ))}
                   {/* {
                    Def.map((e,ind)=>{
                        return(
                            <div>
                            <h1>synontgttygms</h1>
                                {e.synonyms.map((x)=> (
                                      <p>
                                        {x}
                                      </p> 
                            ))}</div>
                        )
                    })
                   } */}
            </div>
        </div>
    )
}

export default Header