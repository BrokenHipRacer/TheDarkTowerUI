import React, {Component} from 'react';

import Footer from '../components/footer';
import GoogleAnalytics from '../components/googleAnalytics';
import Header from '../components/header';
import HeadMetadata from '../components/headMetadata';

/**
 * About page
 */
export default class About extends Component {
  /**
   * @return {JSX.Element}
   */
  render() {
    return (
      <div className="layout-wrapper">
        <HeadMetadata
          title="About Me | Andrew Alsberge Blog"
          metaDescription="Andrew Alsberge is a full stack developer and quality engineer."
        />
        <GoogleAnalytics />
        <Header />
        <div className="about-container">
          <div className="about-section">
            <h1>Andrew Alsberge</h1>
            <p>
              <a href="https://mycrd.is/AndrewAlsberge">My Business Card</a>
            </p>
            <p>
                I'm a dedicated programmer/geek/nerd. I endeavour to enjoying my time behind my computers and also time
                with my husband, dogs, and friends when out of my office.  My partner and I have two dogs, an energetic
                Rat Terrier and a normally chill King Charles except for the once or two times a day he wants to play.
                Currently living in Austin Texas but I'm from upstate New York.  I am a proud member of the LGBTQIA2+
                community, mentored in a pride youth programming summer camp, and attending LGBTQA2+ tech events.  I
                also have dysgraphia which can be seen in my blogs, I will not be in my regards OVER editing my post but
                will also show as example of how I express in written language for normal communication.  While the I
                could spend the like I do in formal documentation this work is the normal me.  Lastly of the airing out
                who I am, I also have epileptic seizures.  I lay these out so people know what they are coming to and if
                there are those with questions, I can answer questions for how I overcome them.
            </p>
            <p>
                I have worked for Bioware(QA), HomeAway/VRBO/Expedia(SDET-SE3), and now work for Khoros as an Quality Engineer 3.  My
                working time has always included working on internal testing tools and frameworks.  I have spent time
                writing test plans, tool documentation, writing tests for both automation and manual testing, PR
                reviews, and mentorship of new hires and college interns.  Tools I have written have been for generating
                test data, reporting and estimating AWS costs, HR peer review system, and an
                authentication/authorization tool.  I have written automated tests for Databases (SQL and No SQL), web
                APIs, web UIs, and an internal Customer Service tool. Unit tests to full stack integration test, White
                Box to Black Box testing.
            </p>
            <p>
                Outside of work, currently I have been having fun with Java, Javascript, and toying with python for AI
                art generation.  I also spend time when at my computers for 3d printing (I have both resin and fdm
                printers), videogames, and then various other programming side projects.  Away from the computer screens
                I enjoy board games, card games, table top roleplaying games, and when I can juggling.  I do/did enjoy
                mountain biking on the rare times I get to do that anymore.  I enjoy mixing up and baking treats for my
                dogs.
            </p>
          </div>
          <div className="about-section">
            <h2>My Projects</h2>
            <ul>
              <h5>The projects that build this website</h5>
              <li><a href="https://github.com/BrokenHipRacer/TheDarkTowerUI">Frontend: The Dark Tower UI</a></li>
              <li><a href="https://github.com/BrokenHipRacer/DarkTowerUIRest">
                  Frontend: The Dark Tower rest client</a></li>
              <li><a href="https://github.com/BrokenHipRacer/DarkTowerAdminUI">Backend: The Dark Tower Admin UI</a></li>
              <li><a href="https://github.com/BrokenHipRacer/DarkTowerAdminRest">
                  Backend: The Dark Tower Admin rest client</a></li>
              <h5>For funs</h5>
              <li><a href="https://github.com/BrokenHipRacer/TheDarkTower">Interview exercises</a></li>
              <li><a href="https://github.com/BrokenHipRacer/DarkArts">(What will be my AI art)</a></li>
            </ul>
          </div>
          <div className="about-section">
            <h2>Currently Using</h2>
            <ul>
              <li><strong>Computers</strong>: M1 MacBook Pro, IBM Legion PC, Raspberry PI4</li>
              <li><strong>Web Services</strong>: AWS Route 53, AWS EC2, AWS EBS, Atlas MongoDB, other Raspberry PI processes</li>
              <li><strong>Editors</strong>: IntelliJ IDEA, Notepad++, nano</li>
            </ul>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
