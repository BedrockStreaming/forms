const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

module.exports = {
  title: 'Bedrock Streaming Forms',
  tagline: 'I receive inputs, you receive forms',
  url: 'https://BedrockStreaming.github.io',
  baseUrl: '/forms/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'BedrockStreaming',
  projectName: 'forms',
  themeConfig: {
    colorMode: { defaultMode: 'dark', disableSwitch: false },
    navbar: {
      title: 'Home',
      logo: {
        alt: 'Bedrock Streaming Forms Logo',
        src: 'img/bedrock_logo.svg',
      },
      items: [
        {
          to: 'docs/',
          activeBasePath: 'docs',
          label: 'Doc',
          position: 'left',
        },
        {
          href: 'https://github.com/BedrockStreaming/forms',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Overview',
              to: 'docs/',
            },
            {
              label: 'Quickstart',
              to: 'docs/quickstart/',
            },
            {
              label: 'Using Forms with Redux',
              to: 'docs/form-redux/',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Stack Overflow',
              href: 'https://stackoverflow.com/questions/tagged/bedrockstreaming',
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/Bedrock_Stream',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/BedrockStreaming/forms',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} BedrockStreaming, Inc. Built with Docusaurus.`,
    },
    prism: {
      theme: lightCodeTheme,
      darkTheme: darkCodeTheme,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: 'https://github.com/BedrockStreaming/forms/edit/master/apps/docsite/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],

  // themes: ['@docusaurus/theme-live-codeblock']
};
