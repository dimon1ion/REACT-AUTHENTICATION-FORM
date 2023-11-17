import fetchMock from "fetch-mock";

const loginUser = async (email, password) => {
    try {
        fetchMock.post('https://api.example.com/login', {
          userId: '123',
          token: '123123213123',
        });
    
        const response = await fetch('https://api.example.com/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });
    
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error(`Логин или пароль неверны!`);
          }
          throw new Error(`Попробуйте чуть позже`);
        }
    
        const data = await response.json();
        return data;
      } catch (error) {
        console.error('Error during login:', error.message);
        throw error;
      } finally {
        fetchMock.restore();
      }
};

export default loginUser;
