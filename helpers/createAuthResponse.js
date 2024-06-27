const createAuthResponse = (user) => {
  return {
    user: {
      id: user.id,
      email: user.email,
      subscription: user.subscription,
    },
  };
};

export default createAuthResponse;
