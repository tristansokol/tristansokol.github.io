fs = require('fs');
let parser = require('parser-front-matter');
let SpellChecker = require('spellchecker');


const postDirectory = '../_posts/';

let posts = fs.readdirSync(postDirectory);

for (let i = 0; i < posts.length; i++) {
  content = fs.readFileSync(postDirectory + posts[i], 'utf8')
  let parsed = parser.parseSync(content);
  test('Has exerpt Snippet', () => {
    expect(content).toEqual(expect.stringContaining('<!--more-->'));
  });

  //
  console.log(SpellChecker.checkSpelling(parsed.content))
  test('Has a lead image', () => {
    expect(parsed.data).toHaveProperty('image');
  });
}


// Spelling and grammar checking
// Image having checking, setting some kind of primary image?
// Excerpt having checking.
// Excerpt best practices.
// Link checking
