import { utilService } from "../../../services/util.service.js";
import { storageService } from "../../../services/async-storage.service.js";

const MAIL_KEY = 'mailsDB'
_createMails()

export const emailService = {
    query,
    getUser,
    get,
    sentEmail,
    changeReadMode,
  };



const loggedInUser = {
    email: 'raz@appsus.com',
    fullName: 'Raz Kadosh'
}

function query() {
    return storageService.query(MAIL_KEY)
        .then(emails => emails.sort((a, b) => {
            return new Date(b.sentAt) - new Date(a.sentAt);
        }))
}

function get(mailId) {
    return storageService.get(MAIL_KEY, mailId)
}

function getUser() {
    return loggedInUser;
}

function changeReadMode(mailId) {
    return get(mailId)
        .then((email) => {
            email.isRead = !email.isRead;
            return storageService.put(MAIL_KEY, email)
        })
}


function sentEmail(to, subject, body) {
    const newSentEmail = {
        id: utilService.makeId(),
        status: 'sent',
        subject,
        body,
        isRead: false,
        sentAt: Date.now(),
        from: { name: loggedInUser.fullName, email: loggedInUser.email },
        to: { name: to, email: to }
    }
    return storageService.post(MAIL_KEY, newSentEmail);
}


function _createMails() {
    let emails = utilService.loadFromStorage(MAIL_KEY);
    if (!emails || !emails.length) {
        emails = [
            {
                id: utilService.makeId(),
                status: 'inbox',
                subject: 'Your order is on the way!',
                body: 'Hi Raz, your parcel is on its way and it should be with you soon!',
                isRead: false,
                isStarred: true,
                sentAt: Date.now() - (1000 * 60 * 60 * 24),
                from: { name: 'Asos', email: 'Asos@gmail.com' },
                to: { name: 'Raz Kadosh', email: 'raz@appsus.com' }
            },
            {
                id: utilService.makeId(),
                status: 'inbox',
                subject: 'Raz, you are getting noticed',
                body: 'visit us to see who is looking at your profile!',
                isRead: false,
                isStarred: false,
                sentAt: Date.now(),
                from: { name: 'LinKedIn', email: 'linkedin@gmail.com' },
                to: { name: 'Raz Kadosh', email: 'raz@appsus.com' }
            },
            {
                id: utilService.makeId(),
                status: 'inbox',
                subject: 'Chip flight alert!!!',
                body: 'Book flight to some real wanted destinations up to 90$!!',
                isRead: true,
                isStarred: false,
                sentAt: Date.now() - (1000 * 60 * 60 * 24),
                from: { name: 'Wizzair', email: 'wizzair@gmail.com' },
                to: { name: 'Raz Kadosh', email: 'raz@appsus.com' }
            },
            {
                id: utilService.makeId(),
                status: 'sent',
                subject: 'Meeting',
                body: 'Hi bro, we need to meet up and study to sprint 4 in Coding Academy, lt me know when you free',
                isRead: true,
                isStarred: false,
                sentAt: Date.now() - (1000 * 60 * 60 * 24 * 2),
                from: { name: 'Raz Kadosh', email: 'raz@appsus.com' },
                to: { name: 'Ido Talbi', email: 'ido@appsus.com' },
            },
            {
                id: utilService.makeId(),
                status: 'inbox',
                subject: 'Raz, "Fauda" season 3 is now on Netflix',
                body: 'This message was mailed to [raz@appsus.com] by Netflix as part of youre Netflixs membership.',
                isRead: false,
                isStarred: false,
                sentAt: Date.now() - (1000 * 60 * 60 * 24 * 4),
                from: { name: 'Netflix', email: 'Netflix@gmail.com' },
                to: { name: 'Raz Kadosh', email: 'raz@appsus.com' }
            },
            {
                id: utilService.makeId(),
                status: 'inbox',
                subject: 'Payment approve',
                body: 'You have sent payment to Apple Services, this confirmed and you will see this in the next charge',
                isRead: true,
                isStarred: false,
                sentAt: Date.now() - (1000 * 60 * 60 * 24 * 10),
                from: { name: 'Paypal', email: 'Paypal@gmail.com' },
                to: { name: 'Raz Kadosh', email: 'raz@appsus.com' }
            },
            {
                id: utilService.makeId(),
                status: 'inbox',
                subject: 'Raz, new discount',
                body: 'You have sent request to us, the request confirmed and you will see this in the next charge',
                isRead: false,
                isStarred: false,
                sentAt: Date.now() - (1000 * 60 * 60 * 24 * 20),
                from: { name: 'eBay', email: 'ebay@gmail.com' },
                to: { name: 'Raz Kadosh', email: 'raz@appsus.com' }
            },
            {
                id: utilService.makeId(),
                status: 'trash',
                subject: 'Security alert',
                body: 'Someone is trying to enter your account, please be careful',
                isRead: false,
                isStarred: false,
                sentAt: Date.now() - (1000 * 60 * 60 * 24 * 10),
                from: { name: 'Instagram', email: 'instagram@gmail.com' },
                to: { name: 'Raz Kadosh', email: 'raz@appsus.com' }
            },
        ];
        utilService.saveToStorage(MAIL_KEY, emails);

    }
    return emails;
}