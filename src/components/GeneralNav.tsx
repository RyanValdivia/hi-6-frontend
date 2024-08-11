import Input from "./ui/InputSearch"

function GeneralNav() {
  return (
    <nav className="shadow-xl flex items-center justify-around w-full px-10 h-16">
        <h1 className="text-4xl font-bold text-basic">HI-6</h1>
        <div>
            {
                /*
                    TODO Add search functionality
                */
            }
            <Input type="text"></Input>
        </div>

    </nav>
  )
}

export default GeneralNav