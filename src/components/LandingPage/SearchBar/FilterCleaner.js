function FilterCleaner(uncleaned = String, searchType = String) {
    let cleaned = "";
    for (let i = 0; i < uncleaned.length; i++) {
        if (uncleaned.charAt(i).equals(' ')) {
            cleaned.concat("%20");
        }
        if (uncleaned.charAt(i).equals(',')) {
            cleaned.concat(searchType);
            i++;
        }
        else {
            cleaned.concat(uncleaned.charAt(i));
        }
    }
    return cleaned;
}