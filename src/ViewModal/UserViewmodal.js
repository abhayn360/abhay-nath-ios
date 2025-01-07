export const getUserListForView = (users) => {
    return users.map((user) => ({
      id: user.id,
      avatar: user.avatar_url,
      name: user.login,
      type: user.type,
    }));
  };
  