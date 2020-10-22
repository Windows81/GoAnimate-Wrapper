const loadPost = require("../request/post_body");
const folder = process.env.THEME_FOLDER;
const fUtil = require("../fileUtil");
const http = require("http");

/**
 * @param {http.IncomingMessage} req
 * @param {http.ServerResponse} res
 * @param {string} url
 * @returns {boolean}
 */
module.exports = function (req, res, url) {
	if (req.method != "POST" || url.path != "/goapi/getTheme/") return;
	loadPost(req, res).then((data) => {
		var theme = data.themeId;
		switch (theme) {
			case "family":
				theme = "custom";
				break;
		}
		res.setHeader("Content-Type", "application/zip");
		fUtil.makeZip(`${folder}/${theme}.xml`, "theme.xml").then((b) => res.end(b));
	});
	return true;
};
