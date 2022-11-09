'use strict'

import { storageService } from '../../../services/async-storage.service.js';


const EMAILS_KEY = 'emailsDb'


const gEmails = [
    {
        id: 'e101',
        subject: 'Miss you!',
        body: 'Would love to catch up sometimes',
        isRead: false,
        sentAt: 1551133930594,
        from: 'momo@momo.com',
        to: 'user@appsus.com'
    },
    {
        id: 'e102',
        subject: 'Hello bar!',
        body: 'Your first email!',
        isRead: false,
        sentAt: 1551133930594,
        from: 'momo@momo.com',
        to: 'user@appsus.com'
    },
]

const loggedinUser = {
    email: 'bar@appsus.com', 
    fullname: 'Bar Zaken'
}

const emails = _createEmails()

function _createEmails() {
    let emails = localStorage.getItem(EMAILS_KEY)
    if (!emails) {
        emails = gEmails
        localStorage.setItem(EMAILS_KEY, JSON.stringify(emails))
    }
    return emails
}

export const emailService = {
    query,
    get,
    addEmail,
}


function query() {
    return storageService.query(EMAILS_KEY)
}

function addEmail(email) {
    return storageService.post(EMAILS_KEY, email, false)
}

function get(id) {
    return storageService.get(EMAILS_KEY, id)
}


// function addReview(email,review){
//     review.id = storageService._makeId()
//     return storageService.get(EMAILS_KEY,email.id).then(email =>{
//         if(!email.reviews) email.reviews = [] 
//         email.reviews.push(review)
//         storageService.put(EMAILS_KEY,email)
//         return Promise.resolve(email)
//     })
// }

// function removeReview(email,reviewId){
//     return storageService.get(EMAILS_KEY,email.id).then(email =>{
//         const idx = email.reviews.findIndex(review => review.id === reviewId)
//         email.reviews.splice(idx,1)
//         storageService.put(EMAILS_KEY,email)
//         return Promise.resolve(email)
//     })
// }

