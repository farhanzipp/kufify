const Footer = () => {
    const socials = {
        instagram: "https://www.instagram.com/farhanzip/",
        email: "https://google.com"
    };
    
  return (
    <footer className='w-full p-1 bg-teal-700 text-xs absolute bottom-0'>
        <div className="container px-3 mx-auto flex justify-between items-center text-white font-normal">
            <p className="font-semibold">©1445 <a href='https://farhanzip.netlify.app' target='_blank' rel='noreferrer' className=" hover:text-amber-400"> Farhanzip</a> </p>
            <div className="flex gap-2">
                <a href={socials.instagram} target="_blank" rel="noreferrer">
                    <img src='./instagram.svg' alt="instagram logo" className='h-4'/>
                </a>
                <a href={socials.email} target="_blank" rel="noreferrer">
                    <img src='./envelope-regular.svg' alt='kufify logo' className='h-4' />
                </a>
            </div>
        </div>
    </footer>
  )
}

export default Footer