const moderntInclude = (srcPaths) => {
    const resolvedModules = {};

    if (!Array.isArray(srcPaths)) {
        throw Error('moderntInclude: srcPaths should be an array of paths');
    }

    return (file) => {
        if (!file) {
            return false;
        }

        const dir = file.match(/^.*[/\\]node_modules[/\\](@.*?[/\\])?.*?[/\\]/);
        const resolved = dir && resolvedModules[dir[0]];

        if (typeof resolved === 'boolean') {
            return resolved;
        }

        if (!dir) {
            return true;
        } else {
            try {
                const b = dir && !!require(dir[0] + 'package.json').exports;
                resolvedModules[dir[0]] = b;
                return b;
            } catch (e) {
                resolvedModules[dir[0]] = false;

                return false;
            }
        }
    };
};

module.exports = moderntInclude;
