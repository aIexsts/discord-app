const express = require('express');
const router = express.Router();
const friendInvitationControllers = require('../controllers/friendInvitation/friendInvitationControllers');
const Joi = require('joi');
const validator = require('express-joi-validation').createValidator({});
const auth = require('../middleware/auth')

const postFriendInvitationScheme = Joi.object({
    targetEmailAddress: Joi.string().email().required()
});

const inviteDecisionScheme = Joi.object({
    id: Joi.string().required()
});

router.post(
    '/invite',
    auth,
    validator.body(postFriendInvitationScheme),
    friendInvitationControllers.postInvite
);

router.post(
    '/accept',
    auth,
    validator.body(inviteDecisionScheme),
    friendInvitationControllers.postAccept
);

router.post(
    '/reject',
    auth,
    validator.body(inviteDecisionScheme),
    friendInvitationControllers.postReject
);

module.exports = router;