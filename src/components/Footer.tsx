import React from 'react'

const Footer = () => {
  return (
    <footer>
      <a className="iconlink" href="mailto:dmdoull43@gmail.com" target="_blank" rel="noreferrer">
        <img src={require('@/assets/email.png')} alt="email" />
      </a>
      <a className="iconlink" href="https://github.com/Van-Nostrand/electronic-life" target="_blank" rel="noreferrer">
        <img src={require('@/assets/github.svg')} alt="https://github.com/Van-Nostrand/electronic-life" />
      </a>
      <a className="iconlink" href="https://www.linkedin.com/in/mike-doull-34b9211a6/" target="_blank" rel="noreferrer">
        <img src={require('@/assets/linkedin2.svg')} alt="https://www.linkedin.com/in/mike-doull-34b9211a6/" />
      </a>
    </footer>
  )
}

export default Footer
