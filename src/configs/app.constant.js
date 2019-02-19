const HOSTNAME = window.location.hostname;
const PORT = window.location.port ? `:${window.location.port}` : '';
const BROWSER_HOST = `${window.location.protocol}//${HOSTNAME}${PORT}`;
const PAGE_LIMIT = 10;
const PAGE_SHOW = [10, 30, 50];
const TIMEZONE = 'Asia/Tokyo';
const DONT_CHECK_DOMAIN_PATH = [
  '/signUp',
  '/register-success',
  '/active-general-user',
  '/active-invite-user',
  '/invite-switch-workspace',
  '/invite',
  '/signIn',
  '/signUp/confirm',
  '/document-preview',
  '/user-profile',
  '/record/share',
];
const CLEAR_AUTH_STATE = [
  'yourWorkspaces',
  'activeAccount',
  'activeInviteAccount',
  'resetPassword',
];
const PRIMARY_DOMAIN_STATES = [
  'preSignIn',
  'deleteWorkspaceSuccess',
  'register',
  'workspaceExpired',
  'yourWorkspaces',
  'requestWorkspaceSuccess',
  'requestWorkspace',
  'ADAuthenticationWorkspace',
  'embedPreSignUp',
  'activeExpired',
  'activeInviteExpired',
  'userProfile',
  'share-records',
];
const SUB_DOMAIN_STATE = [
  'inviteSignUpExpired',
  'activeInviteAccount',
  'inviteSignInExpired',
  'inviteSignIn',
  'inviteSwitchSignIn',
  'signUp',
  'confirmSignUp',
  'signIn',
  'invite',
  'registerSuccess',
  'activeAccount',
  'requestPassword',
  'requestPasswordSuccess',
  'resetPassword',
  'resetPasswordSuccess',
  'resetPasswordExpired',
  'ADAuthenticationRedirect',
  'ADVerify',
  'userProfile',
  'confirmInviteLogout',
];
const GROUP_SECURITY_STATE = {
  STATISTICS: [
    'dashboard.channel-statistics',
    'dashboard.user-statistics',
  ],
  MEETING: [
    'dashboard.join-conference',
    'dashboard.create-join-conference',
    'dashboard.edit-join-conference',
    'dashboard.conference-histories',
  ],
  SALES: [
    'dashboard.join-saleslight',
    'dashboard.saleslight-histories',
  ],
  MEETING_AND_SALE: [
    'dashboard.document.list',
    'dashboard.document.preview',
    'dashboard.questionaire.list',
    'dashboard.questionaire.show',
    'dashboard.questionaire.create',
    'dashboard.questionaire.edit',
  ],
  GROUP: [
    'dashboard.group.show',
    'dashboard.group.edit',
    'dashboard.group.create',
  ],
  USER: [
    'dashboard.user.show',
  ],
};

export {
  PRIMARY_DOMAIN_STATES,
  GROUP_SECURITY_STATE,
  SUB_DOMAIN_STATE,
  CLEAR_AUTH_STATE,
  HOSTNAME,
  PORT,
  BROWSER_HOST,
  PAGE_LIMIT,
  PAGE_SHOW,
  TIMEZONE,
  DONT_CHECK_DOMAIN_PATH,
};
