const url = `https://api.cloudinary.com/v1_1/${
  import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
}/auto/upload`;

const uploadFile = async (file) => {
  // Create a new FormData object to handle file data
  const formData = new FormData();

  // Append the file to the form data
  formData.append('file', file);

  // Append the upload preset (for Cloudinary)
  formData.append('upload_preset', 'chat-app-file');

  const response = await fetch(url, {
    method: 'POST',
    body: formData,
  });
  const responseData = await response.json();

  return responseData;
};

/*
function uploadFile(file) {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'chat-app-file');

  return fetch(url, {
    method: 'POST',
    body: formData,
  })
    .then((response) => {
      return response.json();
    })
    .then((responseData) => {
      //console.log(responseData);
      return responseData;
    });
}
    */

export default uploadFile;
