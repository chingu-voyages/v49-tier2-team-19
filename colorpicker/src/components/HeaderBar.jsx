export default function HeaderBar() {
    return (
        <div className='z-40 flex items-center bg-black fixed sticky top-0'>
            <div>
                <img 
                src="logo_colorme.png" 
                alt="Logo Color Me" 
                width="60" height="60"
                className="pl-2 pr-1"
                /> 
            </div>
            <div className="text-white text-right text-wrap text-sm p-4">find the best color for your <span className="font-bold">anything</span></div>
            <div className="text-black font-bold text-sm bg-white p-1.5 mr-4 rounded-lg">ColorMe</div>
        </div>
    );
  }
   