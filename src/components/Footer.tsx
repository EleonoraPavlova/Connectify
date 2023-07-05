type FooterProps = {
    title: String
}

function Footer(props: FooterProps) {
  console.log('Footer is rendering')
  return(<h5>{ props.title}</h5> ) 
}

export default Footer;