'use strict'

import { storageService } from '../../../services/async-storage.service.js';
import { utilService } from '../../../services/util.service.js';

const EMAILS_KEY = 'emailsDb'


const gEmails = [
    {
        id: 'e101',
        subject: 'Miss you!',
        body: 'Would love to catch up sometimes',
        isRead: false,
        isStar: false,
        isDraft:false,
        sentAt: 1551133930594,
        from: 'momo@momo.com',
        to: 'user@appsus.com'
    },
    {
        id: 'e102',
        subject: 'Hello bar!',
        body: 'Your first email!',
        isRead: false,
        isStar: false,
        isDraft:false,
        sentAt: 1551133930594,
        from: 'momo@momo.com',
        to: 'user@appsus.com'
    },
    {
        id: 'e103',
        subject: 'Hello bar!',
        body: 'Your first email!',
        isRead: false,
        isStar: false,
        isDraft:false,
        sentAt: 1551133930594,
        from: 'momo@momo.com',
        to: 'user@appsus.com'
    },
    {
        id: 'e104',
        subject: 'Hello bar!',
        body: 'Your first email!',
        isRead: false,
        isStar: false,
        isDraft:false,
        sentAt: 1551133930594,
        from: 'momo@momo.com',
        to: 'user@appsus.com'
    },
    {
        id: 'e1045',
        subject: 'Check Time!!',
        body: 'Your first email!',
        isRead: false,
        isStar: false,
        isDraft:false,
        sentAt: 1668024020406,
        from: 'momo@momo.com',
        to: 'user@appsus.com'
    },
    {
        id: 'e106',
        subject: 'Its Bar TESTING',
        body: 'Your first email!',
        isRead: false,
        isStar: false,
        isDraft:false,
        sentAt: 1668024020406,
        from: 'bar@appsus.com',
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
    getTemplateEmail
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


