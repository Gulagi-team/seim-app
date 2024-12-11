import moment from 'moment';
import RNFS from 'react-native-fs';

const ROOT_DIR = RNFS.DocumentDirectoryPath + 'json';

const writeToFile = async (data: any, fileName: string) => {
  try {
    const dirExists = await RNFS.exists(ROOT_DIR);
    if (!dirExists) {
      await RNFS.mkdir(ROOT_DIR);
    }

    const transferData = data.map((item: any) => {
      return {
        ...item,
        updatedAt: moment().toISOString(),
      };
    });
    // Write the file
    const filePath = `${ROOT_DIR}/${fileName}`;
    await RNFS.writeFile(filePath, JSON.stringify(transferData), 'utf8');
  } catch (error) {
    console.error('Failed to save file:', error);
  }
};

const readFromFile = async (fileName: string) => {
  try {
    const filePath = `${ROOT_DIR}/${fileName}`;
    const fileExists = await RNFS.exists(filePath);

    if (!fileExists) {
      return [];
    }

    const fileContent = await RNFS.readFile(filePath, 'utf8');
    return JSON.parse(fileContent);
  } catch (error) {
    console.error('Failed to read file:', error);
    return [];
  }
};

const removeFile = async (fileName: string) => {
  try {
    const filePath = `${ROOT_DIR}/${fileName}`;
    const fileExists = await RNFS.exists(filePath);

    if (!fileExists) {
      return;
    }

    await RNFS.unlink(filePath);
  } catch (error) {
    console.error('Failed to remove file:', error);
  }
};

const updateByIdInFile = async (fileName: string, id: string, data: any) => {
  try {
    const updateData = {
      ...data,

      updatedAt: moment().toISOString(),
    };

    const filePath = `${ROOT_DIR}/${fileName}`;
    const fileExists = await RNFS.exists(filePath);

    let parsedData = [];
    if (fileExists) {
      const fileContent = await RNFS.readFile(filePath, 'utf8');
      parsedData = JSON.parse(fileContent);
    } else {
      await writeToFile([updateData], fileName);
      return;
    }

    // Check if the id exists
    const itemIndex = parsedData.findIndex((item: any) => item.habit.id === id);

    if (itemIndex !== -1) {
      // Update the existing item
      parsedData[itemIndex] = {...parsedData[itemIndex], ...updateData};
    } else {
      // Add a new item
      parsedData.push(updateData);
    }

    await RNFS.writeFile(filePath, JSON.stringify(parsedData), 'utf8');
    console.log('Update file successfully');
  } catch (error) {
    console.error('Failed to update file:', error);
  }
};

const updateTaskHistory = async (fileName: string, id: string, data: any) => {
  try {
    const updateData = {
      ...data,
      updatedAt: moment().toISOString(),
    };

    const filePath = `${ROOT_DIR}/${fileName}`;
    const fileExists = await RNFS.exists(filePath);

    let parsedData = [];
    if (fileExists) {
      const fileContent = await RNFS.readFile(filePath, 'utf8');
      parsedData = JSON.parse(fileContent);
    } else {
      await writeToFile([updateData], fileName);
    }

    // Check if the id exists
    const itemIndex = parsedData.findIndex((item: any) => item.taskId === id);

    if (itemIndex !== -1) {
      // Update the existing item
      parsedData[itemIndex] = {...parsedData[itemIndex], ...updateData};
    } else {
      // Add a new item
      parsedData.push(updateData);
    }

    await RNFS.writeFile(filePath, JSON.stringify(parsedData), 'utf8');
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
  updateTaskHistory,
};
