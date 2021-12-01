import React, { useContext, useEffect, useState } from 'react'
import { PaymentContext } from '../Context/PaymentContext'
import "../Pages/pages.css";
import CircleTxtBtns from "../Components/Buttons/CircleBtns_txt/CircleTxtBtns";
import CircleBtnsImg from "../Components/Buttons/CircleBtn_img/CircleBtnsImg";
import Timer from "../Components/Timer/Timer";
import Time from "../Components/Timer/Time";
import MaxCondition from '../Components/max_selection/MaxSelection'
import { useHistory } from 'react-router'
import { getQueriesForElement } from '@testing-library/dom';
import DailyParking from '../Components/Buttons/24+/DailyParking';
import Header from '../Components/Header/Header';


const PrivacyPolicy = (props) => {
	const history = useHistory()
	const { darkMode } = useContext(PaymentContext)
	const [darkModeStyle, setDarkModeStyle] = useState({ globalContainer: 'global_container' })
	const [lot, setLot] = useState(0)
	const [btnClickUpdate, setBtnClickUpdate] = useState(0.0)
	const [val, setVal] = useState(0.0)
	const mxCond = new MaxCondition()
	const date = new Date()
	const max_min_skip = 0.0417 / 60
	var max_num = date.getHours()
	var max_mins = date.getMinutes()
	const time = new Time()

	// Time update nested func for button onClick()
	const timeUpdate = (val) => {
		var nValue = parseFloat(val)
		setVal(nValue)
		// check for match
		if (val == btnClickUpdate) {
			reset()
		}
		else (
			setBtnClickUpdate(nValue)
		)
	}

	useEffect(() => {

		localStorage.setItem('max_count', 0)
		localStorage.setItem('backbutton', true)

		localStorage.setItem('max', 0)
		if (localStorage.getItem('lot') === null) {
			// localStorage.setItem('lot', 4001)
			localStorage.setItem('lot', props.match.params.lot)
		}
		else if (localStorage.getItem('lot') != null) {
			localStorage.removeItem('lot')
			setTimeout(() => {
				localStorage.setItem('lot', props.match.params.lot)
			}, 10)
		}
		setLot(props.match.params.lot)
		if (darkMode >= 1800 || darkMode <= 600) {
			setDarkModeStyle({
				globalContainer: 'global_container_dark',
			})
		}
		if (btnClickUpdate == 0) {
			setBtnClickUpdate(val)
		}
	}, [btnClickUpdate])


	const reset = () => {
		setBtnClickUpdate(0.0)
	}



const set_max_skip = () => {
	switch (max_num) {
		case (max_num >= 18 ? max_num : ''):	
			return (30 - max_num) * 0.0417
			break;
		case (max_num > 6 && max_num < 18? max_num : ''):
				return (18 - max_num) * 0.0417
			break;
		case (max_num < 6? max_num : ''):
			return (6 - max_num) * 0.0417
			break;
	}
}

const trigger_longTerm_Parking = () => { 
history.push('/daily-parking')
}

	return (
		<>
		<Header home={false}/>
		<div className={`${darkModeStyle.globalContainer} choose_lot`}>
		<div className='conditions'>
		<h1 className='TermsCondition'>Terms & Conditions</h1>
		<p>
			TERMS OF USE
We are ONESHOT PARKING CORP. (“OneShot”, “we” or “us” or “our”). The following are
our Terms of Use (“Terms”). <br /><br /><strong>
These Terms must be accepted by a responsible person who is over the age of majority. If 
you are under the age of majority, you may not use the OneShot products and services (the 
“Services”). </strong>
<br /><br />
<strong>ACCEPTANCE OF TERMS</strong><br />
OneShot provides its Services subject to the following Terms, which may be updated by us from 
time to time. Although we will not give you specific written notice of changes, we may provide a
notice via the Services or on our website at <a href='www.OneShotParking.ca'>oneshotparking.ca</a> (the “Website”) that there 
has been a change in these Terms. You should review these Terms from time to time and when 
we provide a notice of change of our Services. Your continued use of the Services constitutes 
your agreement, without limitation or qualification, with all of the terms and conditions as stated 
in this document, which is a legal and binding agreement between you and OneShot.
<br /><br />
<strong>REGISTRATION OBLIGATIONS</strong><br />
If you wish use our Services, you must provide us with, and allow us to maintain a record of, 
certain information, such as your name, postal or zip code, motor vehicle license plate(s) and 
credit card information. We require you to register an account with a unique username and 
password combination in order to participate, enter information and access information. You are 
responsible for maintaining the confidentiality of such passwords and accounts, and are fully 
responsible for all activities that occur under those passwords or accounts. We are not liable for 
any harm caused or related to the theft or misappropriation of any user name or password, 
disclosure of any user name or password, or your authorization of anyone else to use your 
username or password. You agree to immediately notify OneShot if you become aware of or 
believe there is or may have been any unauthorized use of any password or account or any other 
breach of security or any other need to deactivate a user name or password due to security or 
other concerns. You are responsible for exiting from your account at the end of each Service 
browsing session.
<br /> <br />
<strong>PERSONAL INFORMATION</strong><br />
As mentioned in the Privacy Policy ( <a href='http://www.OneShotParking.ca/privacy-policy/'>http://www.OneShotParking.ca/privacy-policy/</a> ) , we 
collect certain personal information from you as part of the registration process. We also collect 
personal information about you - such as parking history - and maintain that information as part 
of your personal information profile. We will link the personal information we collect from you 
with the personal information we collect about you when you use the Services.
In addition to compiling information about you, we may also contact you for the purpose of 
offering you goods and services. Our separate consent for commercial electronic messages 
covers this right and you will have the right to stop receiving commercial electronic messages by
simply unsubscribing.
We will also use the information we obtain to improve our Services and to develop new products
and services.
For full details, please see the entire Privacy Policy, as updated from time to time.
<br /> <br />
<strong>RIGHTS TO IDEAS / CONTENT</strong><br />
OneShot is free to use any images, videos, text, ideas, concepts, know-how, or techniques 
contained in any communication you send to OneShot for any purpose whatsoever, including, 
but not limited to, developing and marketing products using such information, without 
compensation or any other obligations to anyone, including you.
Anything transmitted or posted may be used in perpetuity by OneShot and its affiliated 
organizations for any purpose, including, but not limited to, reproduction, disclosure, 
transmission, publication, broadcast, dissemination, re-posting, ‘tweeting’ and web logging.
OneShot respects the intellectual property of others, and requires that its users do the same. 
Accordingly, you may not post any material protected by copyright anywhere on the Services 
without the express permission of the author or owner of the copyright in that material.
OneShot will promptly take down or block access to infringing or allegedly infringing material 
on its servers if OneShot becomes aware that such material infringes the copyright rights of a 
third party, whether OneShot identifies such infringement in the course of its ordinary and 
reasonable business activities, or through notification by a third party.
If you believe that your intellectual property has been copied in a way that constitutes copyright 
infringement, and appears on the Services, please contact us.
<br /><br />
<strong>LOSS OF DATA/ERRONEOUS DATA</strong><br />
OneShot is not responsible for any damage to you or any third party caused by loss of access to, 
or deletion or alteration of any information on the Services. OneShot is not responsible for any 
damage to you or any third party caused by incorrect information on the Services.
<br /> <br />
<strong>ELECTRONIC COMMUNICATIONS</strong><br />
When you use the Services or send e-mails to us, you are communicating with us electronically. 
You consent to receive communications from us electronically. We will communicate by e-mail 
or by posting notices on the Services. You agree that all agreements, notices, disclosures and 
other communications that we provide electronically satisfy any legal requirement that such 
communications be in writing. If you send any communications or materials to the us by 
electronic mail or otherwise, including but not limited to, any data, questions, comments, 
suggestions, or the like, all such communications are, and will be treated as, non-confidential and
non-proprietary.
<br /><br />
<strong>SPONSORS, THIRD PARTIES AND ADVERTISERS</strong><br />
Your correspondence or business dealings with, or participation in promotions of sponsors, third 
parties or advertisers found on or through the Services, including payment and delivery of related
goods or services, and any other terms, conditions, warranties or representations associated with 
such dealings, are solely between you and such sponsor, advertiser or third party (as applicable). 
You agree that OneShot shall not be responsible or liable for any loss or damage of any sort 
incurred by you or anyone else as the result of any such dealings or as the result of the presence 
of such sponsors, third parties or advertisers on the Services.
<br /> <br />
<strong>HYPERLINKS TO THIRD PARTY WEBSITES</strong><br />
Please note that certain links from the Services may take you to third parties. OneShot provides 
these links only as a convenience and not as an endorsement by OneShot. These linked websites 
are not necessarily under the control or influence of OneShot. If you decide to visit any linked 
website, you do so at your own risk and it is your responsibility to take all protective measures to
guard against viruses and other destructive elements. OneShot is not responsible for the content 
of any such linked websites or any other web page which is not part of our Services and under 
our control. Unless otherwise expressly provided, OneShot makes no representation or warranty 
regarding, and does not endorse, any linked website or the information, products or services 
appearing thereon. Accordingly, you agree that OneShot will not be responsible or liable in any 
way for the accuracy, relevancy, copyright compliance, legality, or decency of material 
contained in any website linked from our Services.
<br /> <br />
<strong>RESTRICTIONS ON USE</strong><br />
We own the copyright in all material, information and content (collectively “Content”) available 
on our Services, including the manner in which such Content is presented. All our rights are 
reserved. Such Content is protected by Canadian and worldwide copyright laws and treaty 
provisions. OneShot grants you a limited non-exclusive, non-transferable license to use and 
display on your computer or other electronic access device, the Content for your own personal 
and non-commercial use only, provided that you do not modify the Content and that you 
maintain all copyright and other proprietary notices. Except as provided herein, you agree not to 
reproduce, make derivative works of, retransmit, distribute, sell, publish, communicate, 
broadcast or otherwise make available any of the Content obtained through our Services, 
including without limitation, by caching, framing, deep-linking or similar means, without the 
prior written consent of the respective copyright owner of such Content. You may not use the 
Services or its Content for any illegal purpose or in any manner inconsistent with these Terms 
and Conditions. You agree to use the Services solely for your own non-commercial use and 
benefit and not for resale or other transfer or disposition to any other person or entity and not to 
support any gaming or gambling.
<br /> <br />
<strong>WEBSITE ACCESS RESTRICTIONS</strong><br />
You agree that you will not use any robot, spider, other automatic device, or manual process to 
monitor or copy our web pages or the Content contained on the Services or for any other 
unauthorized purpose without our prior express written permission. You agree that you will not 
use any device, software or routine to interfere or attempt to interfere with the proper working of 
the Service. You agree that you will not take any action that imposes an unreasonable or 
disproportionately large load on our information technology infrastructure. You agree that you 
will not access, reload or “refresh” pages contained on our Services, or make any other request to
transactional servers, more than once during any thirty second interval. Neither the Services nor 
any portion of the Services may be reproduced, duplicated, copied, sold, resold, cited, or 
otherwise exploited for any commercial purpose without express written consent of OneShot. 
You may not frame or utilize framing techniques to enclose our trademark, logo, or other 
proprietary information (including images, text, page layout, or form) or those of our affiliates 
without express written consent. You may not use any meta tags or any other “hidden text” 
utilizing OneShot’s name or trademarks without our express written consent. Any unauthorized 
use terminates any permission or license we have granted to you. You are granted a limited, 
revocable, and nonexclusive right to create a hyperlink to the Services so long as the link does 
not portray OneShot, its affiliates, or their products or services in a false, misleading, derogatory,
or otherwise offensive matter. You may not use any OneShot logo or other proprietary graphic or
trademark as part of the link without our express written permission.
<br /><br/>
<strong>USER CONDUCT</strong><br />
You understand that all information, data, text, photographs, graphics, images, avatars, video, 
messages, idea, reviews, opinions, suggestions or other materials (“Submitted Content”), 
whether publicly or privately posted, emailed, transmitted, uploaded or other submitted to 
OneShot, are the sole responsibility of the person from which such Submitted Content originated
and any such post, email, transmission, uploading or other submission of such Submitted Content
is subject to these Terms and Conditions. In addition, you also acknowledge and agree that you, 
and not OneShot, are entirely responsible for all Submitted Content that you post, e-mail, 
transmit, upload or otherwise submit via the Services. OneShot does not control the Submitted 
Content posted and, as such, does not guarantee the accuracy, integrity or quality of such 
Content. You understand that by using the Services, you may be exposed to Content that is 
offensive, indecent or objectionable or that is bullying, threatening or inaccurate. Under no 
circumstances will OneShot be liable in any way for any Content (including Submitted Content),
including, but not limited to, for any errors or omissions in any Content, or for any loss or 
damage of any kind incurred as a result of the use of any Submitted Content posted, e-mailed, 
transmitted, uploaded or otherwise submitted.

<br /> <br />
<strong>MODIFICATIONS TO SERVICE</strong><br />
OneShot reserves the right at any time and from time to time to modify or discontinue, 
temporarily or permanently, the Services (or any part of the Services) with or without notice. 
You agree that any modification or discontinuance of the Services may be effected without prior 
notice, and you acknowledge and agree that in connection with any such modification or 
discontinuance, OneShot may immediately deactivate or delete your account and all related 
information and files in your account (including any registration data and personal information). 
You further agree that OneShot shall not be liable to you or to any other person as a result of any
such modification or discontinuance for any reason whatsoever.
<br /><br />
<strong>TERMINATION</strong><br />
You agree that OneShot, in its sole discretion, may suspend or terminate your password, account 
(or any part thereof) or use of the Services, and remove and discard any Submitted Content 
within the Services, for any reason, including, without limitation, for lack of use or if OneShot 
believes that you have violated or acted inconsistently with the letter or spirit of these Terms and 
Conditions. OneShot may also in its sole discretion and at any time discontinue providing the 
Services, or any parts of the Services, with or without notice. You agree that any suspension 
and/or termination of your access to the Services may be effected without prior notice, and 
acknowledge and agree that OneShot may immediately deactivate or delete your account and all 
related information and files in your account (including any registration data and personal 
information) and/or bar any further access to such files or the Services. You further agree that 
OneShot shall not be liable to you or to any other person as a result of any such suspension or 
termination. If you are dissatisfied with the Services or with any terms, conditions, rules, 
policies, guidelines, or practices of OneShot in operating the Services, your sole and exclusive 
remedy is to discontinue using the Services.
<br /><br />
<strong>DISCLAIMER OF WARRANTIES</strong><br />
<strong>YOU EXPRESSLY UNDERSTAND AND AGREE THAT:</strong><br /><br />
a. YOUR USE OF THE SERVICES IS AT YOUR SOLE RISK. THE SERVICES ARE 
PROVIDED ON AN “AS IS” AND “AS AVAILABLE” BASIS, WITHOUT ANY 
REPRESENTATION OR WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, OR ANY 
GUARANTEE OR ASSURANCE THE SERVICES WILL BE AVAILABLE FOR USE, OR 
THAT ALL PRODUCTS, FEATURES, FUNCTIONS OR OPERATIONS WILL BE 
AVAILABLE OR PERFORM AS DESCRIBED. Without limiting the foregoing, we are not 
responsible or liable for any malicious code, delays, inaccuracies, errors, or omissions arising out
of your use of the Services. You understand, acknowledge and agree that you are assuming the 
entire risk as to the quality, accuracy, performance, timeliness, adequacy, completeness, 
correctness, authenticity, security and validity of any and all features and functions of the 
Service, including, without limitation, the Content or Submitted Content associated with your 
use of the Services.<br /><br />
b. ONESHOT MAKES NO WARRANTY THAT: (i) THE SERVICES WILL MEET YOUR 
REQUIREMENTS; (ii) THE SERVICES WILL BE UNINTERRUPTED, TIMELY, SECURE, 
OR ERROR-FREE; (iii) THE RESULTS THAT MAY BE OBTAINED FROM THE USE OF 
THE SERVICES WILL BE ACCURATE OR RELIABLE; (iv) THE QUALITY OF ANY 
PRODUCTS, SERVICES, INFORMATION, OR OTHER MATERIAL PURCHASED OR 
OBTAINED BY YOU THROUGH THE SERVICES WILL MEET YOUR EXPECTATIONS; 
OR (v) THAT THIS WEBSITE, ITS CONTENT, AND THE SERVERS ON WHICH THE 
WEBSITE AND CONTENT ARE AVAILABLE ARE FREE OF VIRUSES OR OTHER 
HARMFUL COMPONENTS.<br /><br />
c. ANY MATERIAL DOWNLOADED OR OTHERWISE OBTAINED THROUGH THE USE 
OF THE SERVICES IS DONE AT YOUR OWN DISCRETION AND RISK AND THAT YOU
WILL BE SOLELY RESPONSIBLE FOR ANY DAMAGE TO YOUR COMPUTER SYSTEM
OR ELECTRONIC DEVICE OR LOSS OF DATA THAT RESULTS FROM THE 
DOWNLOAD OF ANY SUCH MATERIAL.<br /><br />
d. NO ADVICE OR INFORMATION, WHETHER ORAL OR WRITTEN, OBTAINED BY 
YOU FROM ONESHOT OR THROUGH OR FROM THE SERVICES SHALL CREATE ANY
WARRANTY NOT EXPRESSLY STATED IN THE TERMS AND CONDITIONS.<br /><br />
e. THE SERVICES MAY CONTAIN VARIOUS COMBINATIONS OF TEXT, IMAGES, 
AUDIOVISUAL PRODUCTIONS, OPINIONS, STATEMENTS, FACTS, ARTICLES, 
MARKET DATA, OR OTHER INFORMATION CREATED BY US OR BY THIRD 
PARTIES. DUE TO THE NUMBER OF SOURCES FROM WHICH CONTENT IN THE 
SERVICES IS OBTAINED, AND THE INHERENT HAZARDS OF ELECTRONIC 
DISTRIBUTION, THERE MAY BE DELAYS, OMISSIONS OR INACCURACIES IN SUCH 
CONTENT. ACCORDINGLY, SUCH CONTENT IS FOR CASUAL INFORMATION ONLY 
AND SHOULD NOT BE RELIED UPON BY YOU FOR ANY PURPOSE.<br /><br />
f. INFORMATION CREATED BY THIRD PARTIES THAT YOU MAY ACCESS FROM 
THE SERVICES OR THROUGH LINKS IS NOT ADOPTED OR ENDORSED BY US AND 
REMAINS THE RESPONSIBILITY OF SUCH THIRD PARTIES.
LIMITATION OF LIABILITY
YOU EXPRESSLY UNDERSTAND AND AGREE THAT NEITHER ONESHOT NOR ANY 
OF ITS SUBSIDIARIES, DIVISIONS, AFFILIATES, AGENTS, OR LICENSORS SHALL BE 
LIABLE TO YOU OR ANYONE ELSE FOR ANY DIRECT, INDIRECT, INCIDENTAL, 
SPECIAL, CONSEQUENTIAL OR EXEMPLARY DAMAGES, INCLUDING BUT NOT 
LIMITED TO, DAMAGES FOR LOSS OF PROFITS, GOODWILL, USE, DATA OR OTHER 
INTANGIBLE LOSSES (EVEN IF ONESHOT HAS BEEN ADVISED OF THE POSSIBILITY
OF SUCH DAMAGES), RESULTING FROM: <br /><br />(i) THE USE OR THE INABILITY TO USE 
THE SERVICES; <br /><br />(ii) THE COST OF PROCUREMENT OF SUBSTITUTE GOODS AND 
SERVICES RESULTING FROM ANY GOODS, DATA, INFORMATION OR SERVICES 
PURCHASED OR OBTAINED OR MESSAGES RECEIVED OR TRANSACTIONS 
ENTERED INTO THROUGH OR FROM THE SERVICES; <br /><br />(iii) UNAUTHORIZED ACCESS 
TO OR ALTERATION OF YOUR TRANSMISSIONS OR DATA; <br /><br />(iv) STATEMENTS OR 
CONDUCT OF ANY THIRD PARTY ON THE SERVICE; OR <br /><br />(v) ANY OTHER MATTER 
RELATING TO THE SERVICE OR THE SERVICES. YOU HEREBY WAIVE ANY AND 
ALL CLAIMS AGAINST ONESHOT AND ITS SUBSIDIARIES, DIVISIONS, AFFILIATES, 
AGENTS, REPRESENTATIVES AND LICENSORS ARISING OUT OF YOUR USE OF THE
SERVICES AND THE INFORMATION AVAILABLE THEREON.
PERSONAL INJURY OR DEATH
You acknowledge that motor vehicle accidents can be dangerous and that collision with other 
motor vehicles or with other objects can cause injury or death to you or a third party. YOU 
EXPRESSLY UNDERSTAND AND AGREE THAT NEITHER ONESHOT NOR ANY OF 
ITS SUBSIDIARIES, DIVISIONS, AFFILIATES, AGENTS, OR LICENSORS SHALL BE 
LIABLE TO YOU OR ANYONE ELSE FOR ANY DIRECT, INDIRECT, INCIDENTAL, 
SPECIAL, CONSEQUENTIAL OR EXEMPLARY DAMAGES, INCLUDING BUT NOT 
LIMITED TO, DAMAGES FOR LOSS OF PROFITS, GOODWILL, USE, DATA OR OTHER 
INTANGIBLE LOSSES (EVEN IF ONESHOT HAS BEEN ADVISED OF THE POSSIBILITY
OF SUCH DAMAGES), RESULTING FROM THE DESTRUCTION OF PROPERTY, 
PERSONAL INJURY OR DEATH RELATED IN ANY WAY TO THE USE OF THE 
SERVICES.
INDEMNIFICATION
You agree to defend, indemnify and hold harmless each of OneShot, its affiliates and licensors 
and each of their respective officers, directors, employees and agents, including all third parties 
mentioned on the Services, from and against any and all claims, actions or demands, including 
without limitation reasonable legal and accounting fees, resulting from or related to: <br /><br />(a) your 
breach of any of these Terms (including any terms and conditions incorporated by reference); <br /><br />(b)
your use of the Services or Content; or <br /><br />(c) your use or reliance on, or publication, 
communication or distribution of anything on or from the Services or through any other services 
we or our affiliates provide. You shall use your best efforts to cooperate with us in the defense of
any claim. We reserve the right, at our own expense, to assume the exclusive defense and control
of any matter otherwise subject to indemnification by you.
			</p>
			</div>
		</div>
		</>
	);
};

export default PrivacyPolicy;



//  else if(newCheck == false) {
// 			switch (hour) {
// 				case (hour < 18 && hour > 6 ? hour : ''):
// 					const remaining_time = 18 - hour
// 					max_num = parseFloat(`0.0${remaining_time}`)
// 					localStorage.setItem('max', 1)
// 					// console.log(`rem_hr ${remaining_time}`)
// 					break;
// 				case (hour >= 18 && hour < 24 ? hour : ''):
// 					const rem_time = (24 - hour) + 6
// 					max_num = (rem_time > 9 ? max_num = parseFloat(`0.${rem_time}`) : parseFloat(`0.0${rem_time}`))
// 					localStorage.setItem('max', 1)
// 					break;
// 				case (hour < 6 ? hour : ''):
// 					const rem_hr = 6 - hour
// 					max_num = `0.0${rem_hr}`
// 					localStorage.setItem('max', 1)
// 					break;
// 				default: 
// 					max_num = '0.12'
// 					break;
// 			}
// 		}