import React from "react";
import { Link } from "react-router-dom";
import InstagramIcon from '@mui/icons-material/Instagram';
import Facebook from "@mui/icons-material/Facebook";
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import HomeIcon from '@mui/icons-material/Home';
import EmailIcon from '@mui/icons-material/Email';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import "./Footer.css"

const Footer = () => {
  return (
    <>
      <div>
        <footer
          className="footer-container"
          style={{backgroundColor: "#3d4452"}}
        >
          <section
            className="section-1"
            style={{backgroundColor: "rgba(0, 0, 0, 0.2)"}}
          >
            <div >
              <span>Get connected with us on social networks:</span>
            </div>

            <div className="Icons">
              <Link to="/" >
                <InstagramIcon style={{color:"white" , margin:"2px 7px"}}/>
              </Link>
              <Link to="/" >
                <Facebook style={{color:"white" , margin:"2px 7px"}}/>
              </Link>
              <Link to="/" >
                <LinkedInIcon style={{color:"white" , margin:"2px 7px"}}/>
              </Link>
              <Link to="/" >
                <GitHubIcon style={{color:"white" , margin:"2px 7px"}}/>
              </Link>
            </div>
          </section>

          <section className="section-2">
            <div className="section-container">
                <div className="section-box">
                  <h6 >Giftzy.com</h6>
                  <p>
                  Explore the magic of gifting with us, where each purchase is not just a present but a heartfelt experience.
                  </p>
                </div>

                <div className="section-box">
                  <h6 >PRODUCTS</h6>
                  <p>
                    <Link to="/" >
                      Seasonal Gifts
                    </Link>
                  </p>
                  <p>
                    <Link to="/" >
                      Cakes
                    </Link>
                  </p>
                  <p>
                    <Link to="/" >
                      Flowers
                    </Link>
                  </p>
                  <p>
                    <Link to="/" >
                      Books
                    </Link>
                  </p>
                </div>

                <div className="section-box">
                  <h6 >USEFUL LINKS</h6>
                  <p>
                    <Link to="/" >
                      Your Account
                    </Link>
                  </p>
                  <p>
                    <Link to="/" >
                      Become an Affiliate
                    </Link>
                  </p>
                  <p>
                    <Link to="/" >
                      Shipping Rates
                    </Link>
                  </p>
                  <p>
                    <Link to="/" >
                      Help
                    </Link>
                  </p>
                </div>

                <div className="section-box">
                  <h6 >Contact</h6>

                  <p>
                    <HomeIcon style={{color:"white"}}/> Pune, Maharashtra, India 
                  </p>
                  <p>
                    <EmailIcon style={{color:"white"}}/>  giftz@gmail.com
                  </p>
                  <p>
                    <LocalPhoneIcon style={{color:"white"}}/>  + 91 99999 55555
                  </p>
                  <p>
                    <LocalPhoneIcon style={{color:"white"}}/>  + 91 99999 88888
                  </p>
                </div>
              </div>
          </section>

          <div
            className="section-3"
            style={{backgroundColor: "rgba(0, 0, 0, 0.2)"}}
          >
            © 2023 Copyright:
            <Link  to="/">
              www.Giftzy.com
            </Link>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Footer;
