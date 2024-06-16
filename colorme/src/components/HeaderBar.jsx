export default function HeaderBar() {
    return (
        <div className='z-40 flex items-center bg-black fixed sticky top-0'>
            <div>
                <img 
                src="logo_colorme.png" 
                alt="Logo Color Me" 
                width="90" height="90"
                className="pl-2 pr-1"
                /> 
            </div>
            <div className="text-white text-right text-wrap text-lg p-4">find the best color for your <span className="font-bold">anything</span></div>
        </div>
    );
  }
   