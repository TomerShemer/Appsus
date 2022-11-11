'use strict'

import { storageService } from '../../../services/async-storage.service.js';
import { utilService } from '../../../services/util.service.js';
const gEmails =     [
    {
        id: 'e101',
        subject: 'Awesome Deals!',
        body: 'Check out the latest deals! Up to 80% discount on everything',
        isRead: false,
        isStar: false,
        isDraft: false,
        sentAt: 1551133930594,
        from: 'amazon@deals.com',
        to: 'bar@appsus.com'
    },
    {
        id: 'e102',
        subject: 'Your Subscription is about to end!',
        body: 'Hello Bar, your spotify subscription is over at 28/09/2022. Check out our deals,Up to 80% discount on everything ',
        isRead: false,
        isStar: false,
        isDraft: false,
        sentAt: 1551133930594,
        from: 'spotify@support.com',
        to: 'bar@appsus.com'
    },
    {
        id: 'e103',
        subject: 'You have 1 new invitation!',
        body: 'You have 1 new invitation waiting from ',
        isRead: false,
        isStar: false,
        isDraft: false,
        sentAt: 1551133930594,
        from: 'linkdin@support.com',
        to: 'bar@appsus.com'
    },
    {
        id: 'e104',
        subject: 'Check out new APIs on RapidAPI',
        body: 'Were constantly adding new APIs to the RapidAPI Hub. Search the Hub and',
        isRead: false,
        isStar: false,
        isDraft: false,
        sentAt: 1551133930594,
        from: 'support@rapidapi.com',
        to: 'bar@appsus.com'
    },
    {
        id: 'e105',
        subject: 'Take 15% off on top seller items, Bar',
        body: 'Take 15% off Use the coupon code SHOPNOV22for a deal of your choice',
        isRead: false,
        isStar: false,
        isDraft: false,
        sentAt: 1668024020406,
        from: 'ebay@reply.ebay.com',
        to: 'bar@appsus.com'
    },
    {
        id: 'e106',
        subject: 'Awesome Deals!',
        body: 'Check out the latest deals! Up to 80% discount on everything',
        isRead: false,
        isStar: false,
        isDraft: false,
        sentAt: 1551133930594,
        from: 'amazon@deals.com',
        to: 'bar@appsus.com'
    },
    {
        id: 'e107',
        subject: 'Your Subscription is about to end!',
        body: 'Hello Bar, your spotify subscription is over at 28/09/2022. Check out our deals ',
        isRead: false,
        isStar: false,
        isDraft: false,
        sentAt: 1551133930594,
        from: 'spotify@support.com',
        to: 'bar@appsus.com'
    },
    {
        id: 'e108',
        subject: 'You have 1 new invitation!',
        body: 'You have 1 new invitation waiting from ',
        isRead: false,
        isStar: false,
        isDraft: false,
        sentAt: 1551133930594,
        from: 'linkdin@support.com',
        to: 'bar@appsus.com'
    },
    {
        id: 'e109',
        subject: 'Check out new APIs on RapidAPI',
        body: 'Were constantly adding new APIs to the RapidAPI Hub. Search the Hub and',
        isRead: false,
        isStar: false,
        isDraft: false,
        sentAt: 1551133930594,
        from: 'support@rapidapi.com',
        to: 'bar@appsus.com'
    },
    {
        id: 'e110',
        subject: 'Take 15% off on top seller items, Bar',
        body: 'Take 15% off Use the coupon code SHOPNOV22for a deal of your choice',
        isRead: false,
        isStar: false,
        isDraft: false,
        sentAt: 1668024020406,
        from: 'ebay@reply.ebay.com',
        to: 'bar@appsus.com'
    },
]

const EMAILS_KEY = 'emailsDb'

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
    console.log(emails);
    return emails
}

export const emailService = {
    query,
    get,
    remove,
    update,
    addEmail,
    getUser,
    getTemplateEmail,
    getById
}

function getById(id){
    return storageService.get(EMAILS_KEY,id)
}

function getUser() {
    return loggedinUser
}

function getTemplateEmail() {
    return {
        id: utilService.makeId(),
        subject: '',
        body: '',
        isRead: false,
        isStar: false,
        sentAt: '',
        from: '',
        to: ''
    }
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

function remove(id) {
    return storageService.remove(EMAILS_KEY, id)
}

function update(email) {
    return storageService.put(EMAILS_KEY, email)
}

