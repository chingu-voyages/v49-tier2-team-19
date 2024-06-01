export default function HeaderBar() {
    return (
        <div className='flex justify-around items-center bg-black fixed sticky top-0'>
            <div>
                <img 
                src="logo_colorme.png" 
                alt="Logo Color Me Find Your Match" 
                className="m4"
                width="100" height="100"
                />
            </div>
            <div className="font-mono text-lg text-white m-4 tracking-wide">ColorMe</div>
            <div className="font-mono text-lg text-white text-wrap m-4">Find your anything</div>
        </div>
    );
  }
  