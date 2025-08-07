# YAML Validation Guide for bitbucket-pipelines.yml

## 🔍 **Validation Methods**

### 1. **Online YAML Validators**

Use these online tools to validate your YAML syntax:

#### **Recommended Validators:**

- **[YAML Lint](https://www.yamllint.com/)** - Simple and fast validation
- **[YAML Checker](https://yamlchecker.com/)** - Comprehensive validation with detailed error messages
- **[CodeBeautify YAML Validator](https://codebeautify.org/yaml-validator)** - Advanced validation with formatting options
- **[Online YAML Tools](https://onlineyamltools.com/validate-yaml)** - Simple validation tool

### 2. **Validation Steps**

1. **Copy your YAML content:**

   ```bash
   cat bitbucket-pipelines.yml
   ```

2. **Paste into online validator**

3. **Check for errors and fix them**

## 📋 **Current YAML Structure Analysis**

Based on the file content, your YAML has the following structure:

```yaml
image: node:20-alpine

definitions:
  caches:
    yarn: ~/.cache/yarn
    node_modules: node_modules
    next_cache: .next/cache
  services:
    docker:
      memory: 2048

pipelines:
  branches:
    main:
      - step:
          name: Test & Lint
          # ... more content
```

## ⚠️ **Potential Issues to Check**

### 1. **Indentation Issues**

- Ensure consistent indentation (2 spaces per level)
- No tabs, only spaces
- Proper alignment of nested elements

### 2. **String Escaping**

- Check for proper escaping of special characters
- Ensure quotes are properly closed
- Verify emoji characters are properly handled

### 3. **Variable References**

- Ensure `$VARIABLE_NAME` syntax is correct
- Check for proper escaping of `$` characters where needed

### 4. **List Formatting**

- Verify proper list syntax with `-` characters
- Check indentation of list items

## 🔧 **Common Fixes**

### **Issue: Unexpected double-quoted-scalar**

**Solution:** Check for unescaped quotes or special characters in strings

### **Issue: Indentation errors**

**Solution:** Ensure consistent 2-space indentation throughout

### **Issue: Invalid YAML syntax**

**Solution:** Use online validator to identify specific line and character

## 📊 **Validation Checklist**

- [ ] **Basic YAML syntax** - Valid YAML structure
- [ ] **Indentation** - Consistent 2-space indentation
- [ ] **Quotes** - Properly closed and escaped
- [ ] **Lists** - Correct `-` syntax
- [ ] **Variables** - Proper `$VARIABLE` syntax
- [ ] **Special characters** - Emojis and symbols properly handled
- [ ] **Bitbucket-specific syntax** - Valid pipeline structure

## 🚀 **Next Steps After Validation**

1. **Fix any syntax errors** found by the validator
2. **Test the pipeline** by pushing changes
3. **Monitor the pipeline execution** in Bitbucket
4. **Check logs** for any runtime issues

## 📝 **Manual Validation Commands**

```bash
# Check file structure
head -50 bitbucket-pipelines.yml

# Check for common issues
grep -n "  " bitbucket-pipelines.yml | head -10

# Count lines and check for tabs
wc -l bitbucket-pipelines.yml
grep -n $'\t' bitbucket-pipelines.yml

# Check for unclosed quotes
grep -n '"' bitbucket-pipelines.yml | wc -l
```

## 🎯 **Expected Result**

After validation, your YAML should:

- ✅ Parse without syntax errors
- ✅ Have consistent indentation
- ✅ Contain valid Bitbucket Pipelines syntax
- ✅ Be ready for pipeline execution

## 📚 **Additional Resources**

- [Bitbucket Pipelines Documentation](https://support.atlassian.com/bitbucket-cloud/docs/get-started-with-bitbucket-pipelines/)
- [YAML Specification](https://yaml.org/spec/)
- [Bitbucket Pipelines Examples](https://bitbucket.org/product/features/pipelines)

---
x
**Status**: Ready for validation

Use the online validators above to check your YAML syntax and fix any issues before running the pipeline.
