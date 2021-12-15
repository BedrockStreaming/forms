module.exports = {
  docs: [
    'overview',
    {
      type: 'category',
      label: 'Getting Started',
      collapsed: false,
      items: ['quickstart', 'install', 'usage']
    },
    {
      type: 'category',
      label: 'Core',
      collapsed: false,
      items: ['form-builder']
    },
    {
      type: 'category',
      label: 'Plugins',
      items: ['form-redux', 'form-validation-rule-list']
    },
    {
      type: 'category',
      label: 'Contributing',
      items: ['development']
    },
    {
      type: 'category',
      label: 'Docusaurus',
      items: ['doc1', 'mdx']
    }
  ]
};
