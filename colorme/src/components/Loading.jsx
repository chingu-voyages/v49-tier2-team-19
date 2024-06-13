import { Grid } from 'react-spinners-css';

//will display a loading spinner using the user selected color as the loading color
function Loading({color}) {
  return (
    <div className='flex flex-col items-center'>
        <Grid color={color}/>
        <p className='pt-2'>Finding your ideal pallet...</p>
    </div>
  )
}

export default Loading