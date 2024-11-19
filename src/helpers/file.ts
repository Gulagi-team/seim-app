import RNFS from 'react-native-fs';

const ROOT_DIR = RNFS.DocumentDirectoryPath + 'json';

const writeHabitsToFile = async (data: any, fileName: string) => {
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

export {writeHabitsToFile};
