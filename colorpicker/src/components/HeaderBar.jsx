export default function HeaderBar() {
    return (
        <div className='z-40 flex items-center bg-black fixed sticky top-0'>
            <div>
                <img 
                src="logo_colorme.png" 
                alt="Logo Color Me" 
                width="50" height="50"
                className="pl-2 pr-1"
                /> 
            </div>
            <div className="text-white text-right text-wrap text-sm p-4">find the best color for your <span className="font-bold">anything</span></div>
            <div className="text-white text-sm bg-slate-500 p-1.5 mr-4 rounded-lg">ColorMe</div>
        </div>
    );
  }
   