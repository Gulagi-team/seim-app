import RNFS from 'react-native-fs';

const ROOT_DIR = RNFS.DocumentDirectoryPath + 'json';

const writeToFile = async (data: any, fileName: string) => {
  try {
    const dirExists = await RNFS.exists(ROOT_DIR);
    if (!dirExists) {
      await RNFS.mkdir(ROOT_DIR);
    }

    // Write the file
    const filePath = `${ROOT_DIR}/${fileName}`;
    await RNFS.writeFile(filePath, JSON.stringify(data), 'utf8');
    console.log('File saved successfully at', fileName);
  } catch (error) {
    console.error('Failed to save file:', error);
  }
};

const readFromFile = async (fileName: string) => {
  try {
    const filePath = `${ROOT_DIR}/${fileName}`;
    const fileContent = await RNFS.readFile(filePath, 'utf8');
    console.log('File read successfully at', fileName);
    return JSON.parse(fileContent);
  } catch (error) {
    console.error('Failed to read file:', error);
    return [];
  }
};

const removeFile = async (fileName: string) => {
  try {
    const filePath = `${ROOT_DIR}/${fileName}`;
    await RNFS.unlink(filePath);
    console.log('File removed successfully at', fileName);
  } catch (error) {
    console.error('Failed to remove file:', error);
  }
};

const updateByIdInFile = async (fileName: string, id: string, data: any) => {
  try {
    const filePath = `${ROOT_DIR}/${fileName}`;
    const fileContent = await RNFS.readFile(filePath, 'utf8');
    const parsedData = JSON.parse(fileContent);

    // Check if the id exists
    const itemIndex = parsedData.findIndex((item: any) => item.habit.id === id);

    if (itemIndex !== -1) {
      // Update the existing item
      parsedData[itemIndex] = {...parsedData[itemIndex], ...data};
    } else {
      // Add a new item
      parsedData.push(data);
    }

    await RNFS.writeFile(filePath, JSON.stringify(parsedData), 'utf8');
    console.log('File updated successfully at', fileName);
  } catch (error) {
    console.error('Failed to update file:', error);
  }
};

const removeByIdInFile = async (
  fileName: string,
  id: string,
): Promise<boolean> => {
  try {
    const filePath = `${ROOT_DIR}/${fileName}`;
    const fileContent = await RNFS.readFile(filePath, 'utf8');
    const parsedData = JSON.parse(fileContent);
    const updatedData = parsedData.filter((item: any) => item.habit.id !== id);
    await RNFS.writeFile(filePath, JSON.stringify(updatedData), 'utf8');
    console.log('File updated successfully at', fileName);
    return true;
  } catch (error) {
    console.error('Failed to update file:', error);
    return false;
  }
};

const getByIdInFile = async (fileName: string, id: string) => {
  try {
    const filePath = `${ROOT_DIR}/${fileName}`;
    const fileContent = await RNFS.readFile(filePath, 'utf8');
    const parsedData = JSON.parse(fileContent);
    return parsedData.find((item: any) => item.habit.id === id);
  } catch (error) {
    console.error('Failed to get file:', error);
  }
};

export {
  writeToFile,
  readFromFile,
  removeFile,
  updateByIdInFile,
  removeByIdInFile,
  getByIdInFile,
};
