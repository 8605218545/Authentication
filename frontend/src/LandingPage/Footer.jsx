
import React from 'react'

function Footer () {
    return (
        <>
            <footer class="footer" style={{backgroundColor: "#ff6f61"}}>
                <div class="footer-container">
                    <div class="footer-column">
                        <h3>About Us</h3>
                        <p>
                        We are a creative team dedicated to providing the best solutions for your business. Our mission is to help you grow and succeed.
                        </p>
                    </div>

                    <div class="footer-column">
                        <h3>Quick Links</h3>
                        <ul>
                        <li><a href="/about">About Us</a></li>
                        <li><a href="/services">Services</a></li>
                        <li><a href="/blog">Blog</a></li>
                        <li><a href="/contact">Contact Us</a></li>
                        </ul>
                    </div>

                    <div class="footer-column"> 
                        <h3>Contact Info</h3>
                        <p>
                            Email: info@example.com<br />
                            Phone: +1 234 567 890<br />
                            Address: 123 Main St, City, Country 
                        </p>
                    </div>


                <div class="footer-column">
                    <h3>Follow Us</h3>
                    <div class="social-icons">
                    <a href="https://facebook.com" target="_blank">
                        <img src="https://cdn-icons-png.flaticon.com/512/124/124010.png" alt="Facebook"/>
                    </a>
                    <a href="https://twitter.com" target="_blank">
                        <img src="https://cdn-icons-png.flaticon.com/512/124/124021.png" alt="Twitter"/>
                    </a>
                    <a href="https://instagram.com" target="_blank">
                        <img src="https://cdn-icons-png.flaticon.com/512/174/174855.png" alt="Instagram"/>
                    </a>
                    <a href="https://linkedin.com" target="_blank">
                        <img src="https://cdn-icons-png.flaticon.com/512/174/174857.png" alt="LinkedIn"/>
                    </a>
                    </div>
                </div>
                </div>


                <div class="footer-bottom">
                <p>
                    &copy; 2023 Your Company. All Rights Reserved. | 
                    <a href="/privacy-policy">Privacy Policy</a> | 
                    <a href="/terms">Terms of Service</a>
                </p>
                </div>
            </footer>
        </>
    )
}

export default Footer;