import axios from "axios"; //Browser bata HTTP request garna lai yo library chainxa

//asynchronous function banako jasle chai object lai as an argument liraxa
export const signup = async ({ firstName, lastName, email, password }) => {
  const API_URL = "http://localhost:8000/api"; //base url of api. HTTP request jun chai signup function ma garinxa tyo sab yo url ma pathainxa

  try {
    //post function le chai HTTP post request pathauna help garxa msg type ko
    //${API_URL}/register= url chai address jasto vayo register samma pugna ko lagi
    //firstname haru chai information ho jun puryauna lageko
    //Specified url ma chai post request gareko
    const response = await axios.post(`${API_URL}/register`, {
      firstName,
      lastName,
      email,
      password,
    });
    const data = response?.data; // if response exist the get response data from the server. response property ko data chai extract gareko
    return { success: true, data }; //if response succesful vayo vani yesle chai obj return garxa jasko sucess property true gareko xa ra data jun response ma xa
  } catch (error) {
    if (
      error.response &&
      error.response?.status >= 400 &&
      error.response?.status <= 500
    ) {
      return {
        success: false,
        error: error.response.data.message || error.response.data, //if response ma error aaihalyo vani kailey kai server le ressponse ma error msg deko hunxa tyo return garni tara (||) deko xaina vani just data ma j xa tei reurn garni
      };
    }
  }
};
