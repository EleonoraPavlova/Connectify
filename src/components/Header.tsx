type HeaderProps = {
    title: String
}

function Header(props: HeaderProps) {
  console.log('Header is rendering ')
  return(<h1>{ props.title}</h1> ) 
}

export default Header;