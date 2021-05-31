import badgesFixture from './badges';
import careerFixture from './careers';
import rankingFixture from './ranking';

// Generate HTML template for max token allocated by career level
const careerTokenHTML = careerFixture.map(ct => {
  return `<tr class="badge">
    <td>${ ct.careers.join('<br />') }</td>
    <td class="text-xs-left">${ ct.tokenAllocated }</td>
  </tr>
  `;
})

// Generate HTML template for max token sent by career level
const careerTokenMaxHTML = careerFixture.reduce((u, i) => {
  const uIndex = u.findIndex(o => o.maxToken === i.maxToken);

  if (uIndex >= 0) {
    u[uIndex].careers = u[uIndex].careers.concat(i.careers);
  } else {
    u.push(i);
  }

  return u;
}, []).map(ct => {
  return `<tr class="badge">
    <td>${ ct.careers.join('<br />') }</td>
    <td class="text-xs-left">${ ct.maxToken }</td>
  </tr>`;
})

// Generate HTML template for badges
const badgesHTML = badgesFixture
                .sort((a, b) => a - b)
                .map(m => {
  return `<tr class="badge">
    <td>${m.faq_no}</td>
    <td>
      <img class="responsive-img" src="${m.img}" alt="${m.title}" /><strong>${m.title_html}</strong>
    </td>
    <td>
      <ul>
        <li>${m.long_description[0]}</li>
        <li>${m.long_description[1]}</li>
      </ul>
    </td>
  </tr>`;
});

// Generate HTML template for tiers
function displayRange(min, max) {
  return max > 0 ? `${min} &mdash; ${max} badges` : ` > ${min - 1} badges`;
}

const tiersHTML = rankingFixture
                    .tiers
                    .map(t => {
                      return {
                        title: t.name,
                        badge_img: t.img,
                        prospect: rankingFixture.prospects
                                                .filter(p => p.tier_id === t.id)
                                                .reduce((acc, cur) => cur, null),
                      };
                    })
                    .map(rt => {
                      return `
                      <div class="tier flex-1 center">
                        <img class="mb-4" src="${ rt.badge_img }" alt="${ rt.title }" width="150" />
                        <p class="title mb-2">${ rt.title }</p>
                        <span>${ displayRange(rt.prospect.min, rt.prospect.max) }</span>
                      </div>`;
                    });

export default {
  gettingStarted: [
    {
      title: 'Sending tokens and badges',
      content: `
      <ul class="list--unstyled pl-0">
        <li>Step 1: Select the recipient</li>
        <li>Step 2: Type the message</li>
        <li>Step 3: Select the type of badge you are awarding to the recipient (mandatory)</li>
        <li>Step 4: Select the amount of tokens to award the recipient (optional)</li>
        <li>Step 5: Click “<strong>post</strong>” to submit</li>
        <li>Step 6: Your post will appear on the ACE Appreciation wall</li>
      </ul>
      `,
    },
    {
      title: 'View your user history',
      content: `
      <ul class="list--unstyled pl-0">
        <li>Step 1: Go to profile</li>
        <li>Step 2: Click on “<strong>View user history</strong>”</li>
        <li>Step 3: Select the transaction type – redemption history, token received or token sent</li>
        <li>Step 4: Set a time period</li>
        <li>Step 5: Click “<strong>Search</strong>”</li>
      </ul>
      `,
    },
    {
      title: 'Redeem an item',
      content: `
      <ul class="list--unstyled pl-0">
        <li>Step 1: Go to the ACE e-Shop</li>
        <li>Step 2: Add your item of choice to the cart</li>
        <li>Step 3: Click the cart icon at the top right of the page</li>
        <li>Step 4: Review all the items in the cart and ensure you have sufficient tokens available</li>
        <li>Step 5: Refer to order summary</li>
        <li>Step 6: Click on “<strong>Proceed to checkout</strong>”</li>
        <li>Step 7: Click on “<strong>Confirm checkout</strong>” when prompted</li>
        <li>Step 8: Review confirmation email and ensure that all details are correct</li>
      </ul>
      `,
    },
    {
      title: 'Tips to make the best use of the ACE portal ',
      content: `
      <table class="best-use-table">
        <tbody>
          <tr>
            <td>
              <strong>
                Tip #1: <br />
                Be clear
              </strong>
            </td>
            <td>
              <p>Messages should be personalised and thoughtful.</p>
              <p>Your colleague will appreciate knowing why you are recognising them. A well-thought-out message can make anyone’s day!</p>
              <p>Compared to a message that says “Thank you”, elaborating on what you are thanking them for will make the message more meaningful.</p>
              <p>For example, you could say <em>“Thank you for your help on the project, your thoughtful insights and initiative have helped to improve the quality of the teams’ work!”</em></p>
              <p>Please do not leave any empty messages, do your best to express why you are appreciating your colleague.</p>
              <p>Additionally, as all posts are public on the ACE Appreciation Wall, please be mindful of the type of messages you leave for your colleague.</p>
            </td>
          </tr>
          <tr>
            <td>
              <strong>
                Tip #2: <br />
                Be accurate
              </strong>
            </td>
            <td>
              <p>Choose badges that accurately reflect the trait that you are appreciating in your colleague.</p>
              <p>For example, if someone actively gives back to the community, you can choose to award them the World<em>Class</em> citizen badge.</p>
              <p><img class="center-block" src="/worldclass-citizen.png" alt="WorldClass Citizen" /></p>
              <p>If you are unclear about what each badge represents, find out more below in the “<strong>About the ACE Portal section</strong>”</p>
            </td>
          </tr>
          <tr>
            <td>
              <strong>
                Tip #3: <br />
                Be generous
              </strong>
            </td>
            <td>
              <p>The portal is a convenient way for you to recognise your colleagues anytime.</p>
              <p>While you are only allowed to award tokens to the same person twice a month, there is no limit for badges, so you can award the same colleague badges as often as you feel they deserve.</p>
            </td>
          </tr>
        </tbody>
      </table>
      `,
    },
  ],
  aceFaq: [
    {
      title: 'What is the ACE portal?',
      content: `ACE stands for Appreciate, Celebrate, Elevate. It is Deloitte Singapore’s online recognition platform where you can leave personalised thank-you messages, and send achievement badges and tokens to your colleagues across all levels and business units to show how much you appreciate them. This portal is meant to recognise staff for their good work, it does not have an effect on one’s appraisal.`,
    },
    {
      title: 'How does the ACE portal work?',
      content: `The ACE portal can be accessed through the intranet via “<strong>single-sign-on</strong>” which means you will have immediate access to your own unique profile when you enter the portal.<br /><br />Apart from being able to use the portal to leave personalised messages, and send achievement badges and tokens to your colleagues, you can also view your own messages and activities on the portal, and redeem your tokens for gifts from the ACE e- Store.`,
    },
    {
      title: 'Who has access to the ACE portal?',
      content: `Permanent, full-time and part-time employees based in Singapore will have access to the ACE portal.<br /><br />
      Interns and temporary/contract staff do not have access to the ACE portal.<br /><br />
      As the ACE programme is a pilot project launched in Singapore, our colleagues in Consulting Southeast Asia, and in other Southeast Asia practices do not have access to the ACE portal at the moment.<br /><br />
      The roll-out will be completed in phases and you will receive an update when available.`,
    },
    {
      title: 'How do I access the ACE portal?',
      content: `You can access the ACE portal through the shortcut on your desktop or through the URL (<a href="https://ace.deloitteresources.com/">https://ace.deloitteresources.com/</a>).<br /><br />
      To access the ACE portal, you will need to be connected to the Deloitte network. For those accessing the ACE portal outside of the Singapore office or any other Southeast Asia offices, please ensure you are connect to the VPN.`,
    },
    {
      title: 'What are “My Rewards” tokens?',
      content: `These tokens are tokens that you receive from your partners, team leaders and colleagues in recognition of your contributions. They will be deposited in your profile as “<strong>My Rewards</strong>” tokens. These tokens are redeemable for attractive treats and gifts from the ACE e-Store using the “<strong>Redeem</strong>” tab found in the navigation bar`,
    },
    {
      title: 'Will “My Rewards” tokens expire?',
      content: `Yes, “<strong>My Rewards</strong>” tokens will expire 1 year from the date it was given, at the end of the month. You will be reminded of the upcoming expiring tokens in the monthly summary email.<br /><br />
      For example, if you were given the token on 13 April 2019, the token will expire on 30 April 2020 at the end of the month.`,
    },
    {
      title: 'What are “Recognise Others” tokens?',
      content: `“<strong>Recognise Others</strong>” tokens are automatically allocated to you every three months by the ACE Administrator. You can use these tokens to recognise your team members and colleagues for their excellent work, and/or to thank them for the help they extended to you in the course of work.`,
    },
    {
      title: 'How many “Recognise Others” tokens do I get?',
      content: `The number of “Recognise Others” tokens you will receive from the ACE Administrator every quarter depends on your career level.<br /><br />
      <table class="badge-listing">
        <thead>
          <tr>
            <th style="width: 265px;">Career level</th>
            <th class="text-xs-left" style="width: 265px;">“Recognise Others” tokens allocated quarterly</th>
          </tr>
        </thead>
        <tbody>
          ${ careerTokenHTML.join('') }
        </tbody>
      </table>`,
    },
    {
      title: 'Who can I send “Recognise Others” tokens to?',
      content: `You can award your “<strong>Recognise Others</strong>” tokens to anyone in the Deloitte Singapore office across all the businesses <u>except</u> for Partners, Executive Directors, Lead Audit Directors, temporary/contract staff and interns.<br /><br />
      As the ACE programme is a pilot project launched in Singapore, you will also not be able to award tokens to our colleagues in Consulting Southeast Asia, and those in other Southeast Asia practices at the moment.<br /><br />
      The roll-out will be completed in phases and you will receive an update when available.`,
    },
    {
      title: 'Will “Recognise Others” tokens expire?',
      content: `Yes, “<strong>Recognise Others</strong>” tokens will expire on a quarterly basis, the last day of every March, June, September and December at 2400hrs and be refreshed on the first day of every April, July, October and January at 0001hrs, regardless of when you were allocated the token. You will be reminded of your expiring tokens in the monthly summary email sent by the ACE Administrator.<br /><br />
      For example, a new user that was awarded their “<strong>Recognise Others</strong>” tokens on 15 February will still have their tokens expire on 31 March.`,
    },
    {
      title: 'What is the maximum number of “Recognise Others” tokens I can give to a person?',
      content: `The maximum number of “<strong>Recognise Others</strong>” tokens that you can give to an individual at any one time is 10, 15 or 25 tokens per quarter depending on your job level.<br /><br />
      <table class="badge-listing">
        <thead>
          <tr>
            <th style="width: 265px;">Career level</th>
            <th class="text-xs-left" style="width: 265px;">Maximum “Recognise Others” tokens you can give to another individual</th>
          </tr>
        </thead>
        <tbody>
          ${ careerTokenMaxHTML.join('') }
        </tbody>
      </table><br />
      You are only able to give the same person “<strong>Recognise Others</strong>” tokens a maximum of 2 times in a month.`,
    },
    {
      title: 'Are Partners allowed to receive tokens?',
      content: `Partners, Executive Directors and Lead Audit Directors are not allowed to receive tokens. However, they can reward others with their allocated “<strong>Recognise Others</strong>” tokens that are refreshed every quarter.`,
    },
    {
      title: 'What are achievement badges?',
      content: `Achievement badges are for you to award to the colleagues who have displayed the traits stated in the description below. There are eight achievement badges and they do not expire.<br /><br />
      <table class="badge-listing">
        <thead>
          <tr>
            <th>S/No</th>
            <th>Achievement badge</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          ${ badgesHTML.join('') }
        </tbody>
      </table>
      `,
    },
    {
      title: 'How to view your badges?',
      content: `Your badges can be viewed at the bottom of your profile page.
      Sort them by either “<strong>Incoming messages</strong>” or “<strong>Outgoing messages</strong>”.`,
    },
    {
      title: 'How many different tier rankings are there?',
      content: `There are 5 different tiers.<br /><br />
      <div class="ranking-tiers container--flex">
        ${ tiersHTML.join('') }
      </div><br />
      This information can also be found when clicking the “<strong>?</strong>” icon at the Personal Growth Achievement section of your profile page.`,
    },
    {
      title: 'Can I send achievement badges without giving out tokens?',
      content: `Yes, you can send badges to others without giving out any tokens.`,
    },
    {
      title: 'Is it mandatory to leave a message in order to send out tokens and/or badges to your colleagues?',
      content: `Yes, it is mandatory as it allows the recipient to know why you are showing your appreciation for them.`,
    },
  ],
  technicalFaq: [
    {
      title: 'I am facing some technical issues, who can I contact for help?',
      content: `Please submit your enquiry using the “<strong>Contact us</strong>” form below and attach a screenshot of the issue that you are facing, where relevant.<br /><br />
      Alternatively, you can email us at <a href="mailto:sgace@deloitte.com" style="text-transform:inherit;">sgace@deloitte.com</a>.<br /><br />
      The ACE Administrator will contact you to assist you.`,
    },
    {
      title: 'How can I give feedback on ACE?',
      content: `We value your feedback. Please submit your feedback using the “<strong>Contact us</strong>” form.<br /><br />
      Alternatively, you can email us at <a href="mailto:sgace@deloitte.com" style="text-transform:inherit;">sgace@deloitte.com</a>.<br /><br />
      The ACE Administrator will contact you for assistance and clarification, if required.`,
    },
  ],
  giftFaq: [
    {
      title: 'How can I redeem an item?',
      content: `Click on the “<strong>Redeem</strong>” tab in the navigation bar. This will bring you to the ACE e-Store.<br /><br />
      Select the item that you wish to redeem. The item will go into your shopping cart. Click on the shopping cart icon under “<strong>cart</strong>” on the navigation bar to redeem the item.<br /><br />
      Please ensure that you have enough “<strong>My Rewards</strong>” tokens to redeem the item of your choice.`,
    },
    {
      title: 'Are items redeemed from the ACE e-Store taxable? Why?',
      content: `Yes they are. According to Singapore law, all benefits of monetary or non-monetary value given by your company is generally subject to income tax. All redeemable items on ACE will be considered as taxable benefits and will be included in our submission to IRAS as part of your income tax filing. The taxable value of the item is the same or very close to the number of tokens used to redeem it.`,
    },
    {
      title: 'How can I know if I have made a successful redemption?',
      content: `A confirmation pop-up message will be displayed immediately upon successful redemption. You will also receive a confirmation email with your collection details.<br /><br />
      You can also view your redemption transaction under the “<strong>Profile</strong>” tab on the navigation bar. Click “<strong>View user history</strong>” to check your redemption history.`,
    },
    {
      title: 'How can I collect my items?',
      content: `You can collect your items at the D Lounge on Level 30, on Fridays<br /><br />
      The Friday on which you can collect your item will depend on what point of the week you have redeemed the item. The cut-off date and time for items to be collected that same week will be Thursdays, 12PM. Any redemptions made after Thursdays, 12PM can only be collected the following Friday.<br /><br />
      For example, if you redeem an item on 13 November 2019, Wednesday, you can collect your item on 15 November 2019, Friday. However, if you redeem an item on 14 November 2019, Thursday at 2PM, you can only collect your item on 22 November 2019, Friday.<br /><br />
      You will receive an email from the ACE Administrator on collection details. Should there be any changes in the collection date, the ACE Administrator will contact you separately via email to inform you of an alternative collection date.`,
    },
    {
      title: 'What happens when I miss the collection date assigned to me?',
      content: `Please contact the ACE Administrator at <a href="mailto:sgace@deloitte.com" style="text-transform:inherit;">sgace@deloitte.com</a> to arrange for an alternative collection date.`,
    },
    {
      title: 'Can I authorise someone to collect the item on my behalf?',
      content: `Yes, you may authorise your colleague to collect your item on your behalf. Please forward the collection email to them along with a picture of your staff pass. We will check both of these items on the collection day.`,
    },
    {
      title: 'Can I cancel or exchange an item after I have redeemed the item or redeemed the item?',
      content: `No. Please check the details before confirming the item and upon collection. All items redeemed are strictly non-exchangeable and non-refundable.`,
    },
  ],
}
