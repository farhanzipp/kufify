const Footer = () => {
    const socials = {
        instagram: "https://google.com",
        email: "https://google.com"
    };
    
  return (
    <div className='w-full p-1 bg-teal-700'>
        <div className="container mx-auto flex justify-between text-white font-normal">
            <p>©1445 <a href='https://farhanzip.netlify.app' target='_blank' rel='noreferrer' className="hover:text-amber-400"> Farhanzip</a> </p>
            <div className="flex gap-2">
                <a href={socials.instagram} target="_blank" rel="noreferrer">
                    <img src='./instagram.svg' alt="instagram logo" className='h-5'/>
                </a>
                <a href={socials.email} target="_blank" rel="noreferrer">
                    <img src='./envelope-regular.svg' alt='kufify logo' className='h-5' />
                </a>
            </div>
        </div>
    </div>
  )
}

export default Footer