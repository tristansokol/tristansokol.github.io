fs = require('fs');

const postDirectory = '../_posts/';

test('No spaces in file names', () => {
    fs.readdir(postDirectory, (err, files) => {
        files.forEach((file) => {
          expect(file).toEqual(expect.not.stringContaining(' '));
        });
      });
  });
