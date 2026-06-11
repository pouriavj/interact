export const paths = {
  home() {
    return "/";
  },

  explore() {
    return "/explore";
  },

  signIn() {
    return "/signin";
  },

  signUp() {
    return "/signup";
  },

  activity() {
    return "/activity";
  },

  messages() {
    return "/messages";
  },

  conversation(conversationId: string) {
    return `/messages/${conversationId}`;
  },

  profile(username: string) {
    return `/profile/${username}`;
  },

  story(storyId: string) {
    return `/stories/${storyId}`;
  },

  settings() {
    return "/settings";
  },

  editProfile() {
    return "/settings/profile";
  },
};
