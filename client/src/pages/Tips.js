import React from "react";
import "./tips.css"

const Tips = () => {
  return (
    <main>
     <div className="Tips">
      <div className="flex-row justify-center">
        <div className="col-12 col-md-10 mb-3 p-3" id="tipstext">
        <div className="better" >
            <h3 className="tips-title">Tips for Building Happy Habits</h3>
            {/* tips page ready for copy */}
        <ul>
            <li>Start small. Big changes start small.</li>
            <li className="hideme">Replace bad habits with good ones. Don't create a void.</li>
            <li className="hideme">Beware of triggers. Watch out for triggers that set you back.</li>

            <li className="hideme">Link two activities.</li>
            <li className="hideme">Interrupt bad habits.</li>
            <li className="hideme">Find a partner or small group.</li>
            <li className="hideme">Create a substitute reward system.</li>
        </ul>
        </div>
      </div>
      </div>
      </div>
    </main>
//     const api_url ="https://zenquotes.io/api/quotes/";

//     async function getapi(url)
//     {
//       const response = await fetch(url);
//       var data = await response.json();
//       console.log(data);
//     }
    
//     getapi(api_url);
  );
};

export default Tips;