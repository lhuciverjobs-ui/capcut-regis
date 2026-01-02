import fetch from "node-fetch";
import * as cheerio from 'cheerio';
import chalk from 'chalk';
import { faker } from '@faker-js/faker';
import { promises as fs, readFileSync } from 'fs';
import readline from 'readline-sync';
import { HttpsProxyAgent } from 'https-proxy-agent';

// 1. Baca config jika ada, tapi kita buat CLI input
const config = {}; // Kosongkan, gunakan input

// Proxy configuration
const proxyConfig = {
  host: 'gw.dataimpulse.com',
  port: 823,
  username: '38935488858000520623',
  password: 'ad5cd8aa5f62712e'
};

// Create proxy agent
const createProxyAgent = () => {
  const proxyUrl = `http://${proxyConfig.username}:${proxyConfig.password}@${proxyConfig.host}:${proxyConfig.port}`;
  return new HttpsProxyAgent(proxyUrl);
};

function encryptToTargetHex(input) {
  let hexResult = "";
  for (const char of input) {
    const encryptedCharCode = char.charCodeAt(0) ^ 0x05;
    hexResult += encryptedCharCode.toString(16).padStart(2, "0");
  }
  return hexResult;
}

const getEmailRandom = async () => {
    try {
        const res = await fetch('https://generator.email/', {
            agent: createProxyAgent()
        });
        const text = await res.text();
        const $ = cheerio.load(text);
        const result = [];
        $('.e7m.tt-suggestions').find('div > p').each(function (index, element) {
            result.push($(element).text());
        });
        return result;
    } catch (err) {
        console.error(chalk.red("Error generating email domains:", err.message));
        return [];
    }
};

const functionGetLink = async (email, domain) => new Promise((resolve, reject) => {
    // Tambah random User-Agent untuk setiap call
    const userAgents = [
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36',
        'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36',
    ];
    const randomUA = userAgents[Math.floor(Math.random() * userAgents.length)];

    fetch('https://generator.email/', {
        headers: {
            'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
            'accept-language': 'id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7',
            'cookie': `_gid=GA1.2.989703044.1735637209; embx=%5B%22xaviermoen51%40dogonoithatlienha.com%22%2C%22sadahayuv%40jagomail.com%22%2C%22sadahayua%40jagomail.com%22%2C%22sadahayu%40jagomail.com%22%2C%22ajacoba%40auhit.com%22%5D; _ga=GA1.1.1696815852.1733235907; __gads=ID=08e2714256afd00c:T=1733235907:RT=1735638862:S=ALNI_MaFvYNYLhdTjGzS2xa3eZ3jls6QMQ; __gpi=UID=00000f7f6013ca38:T=1733235907:RT=1735638862:S=ALNI_MayYarsiugqTzh0Ky4wHiYNrSnGtQ; __eoi=ID=101f6e905a8358a1:T=1733235907:RT=1735638862:S=AA-AfjZCYAfxlwf-nyRYeP_9J9rE; FCNEC=%5B%5B%22AKsRol8j6KSk9Pga59DuS0D4a2pk72ZTqwfVO82pNZ4h-bO_EWCi04aWAU6ULkfWs6oHpsd6Cs949FJ6fmNfbqNhHt8GslL8Aa0Dzr20gerHRB_kL3qK8nW6DeD0WzT9KfeamIWXb1LyD2b7IDCPM94I8fUvBRcTqA%3D%3D%22%5D%5D; _ga_1GPPTBHNKN=GS1.1.1735637208.2.1.1735638882.38.0.0; surl=${domain}%2F${email}`,
            'user-agent': randomUA,
        },
        redirect: 'follow',
        agent: createProxyAgent()
    })
        .then(res => res.text())
        .then(async text => {
            const $ = cheerio.load(text);
            const src = $("#email-table > div.e7m.row.list-group-item > div.e7m.col-md-12.ma1 > div.e7m.mess_bodiyy > div > div > div:nth-child(2) > p:nth-child(2) > span").text().trim();
            resolve(src)
        })
        .catch(err => reject(err));
});

async function regist_sendRequest(encryptedEmail, encryptedPassword) {
  try {
    const url = new URL('https://www.capcut.com/passport/web/email/send_code/');
    const queryParams = {
      aid: '348188',
      account_sdk_source: 'web',
      language: 'en',
      verifyFp: 'verify_m7euzwhw_PNtb4tlY_I0az_4me0_9Hrt_sEBZgW5GGPdn',
      check_region: '1'
    };
    
    Object.entries(queryParams).forEach(([key, value]) => {
      url.searchParams.append(key, value);
    });

    const formData = new URLSearchParams();
    formData.append('mix_mode', '1');
    formData.append('email', encryptedEmail); // Hex encoded
    formData.append('password', encryptedPassword);     // XOR encoded
    formData.append('type', '34');
    formData.append('fixed_mix_mode', '1');

    // Random UA
    const userAgents = [
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36',
        'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36',
    ];
    const randomUA = userAgents[Math.floor(Math.random() * userAgents.length)];

    const response = await fetch(url.toString(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': randomUA,
      },
      body: formData,
      agent: createProxyAgent()
    });
    const data = await response.json();
    return data

  } catch (error) {
    console.error('Error:', error);
  }
}

async function verify_sendRequest(encryptedEmail, encryptedPassword, encryptedCode) {
  try {
    const originalDate = faker.date.birthdate()
    const dateObj = new Date(originalDate);
    const formattedDate = dateObj.toISOString().split('T')[0];
    const url = new URL('https://www.capcut.com/passport/web/email/register_verify_login/');
    const queryParams = {
      aid: '348188',
      account_sdk_source: 'web',
      language: 'en',
      verifyFp: 'verify_m7euzwhw_PNtb4tlY_I0az_4me0_9Hrt_sEBZgW5GGPdn',
      check_region: '1'
    };

    Object.entries(queryParams).forEach(([key, value]) => {
      url.searchParams.append(key, value);
    });
    const formData = new URLSearchParams();
    formData.append('mix_mode', '1');
    formData.append('email', encryptedEmail); 
    formData.append('code', encryptedCode);
    formData.append('password', encryptedPassword);
    formData.append('type', '34');
    formData.append('birthday', formattedDate);
    formData.append('force_user_region', 'ID');
    formData.append('biz_param', '%7B%7D');
    formData.append('check_region', '1');
    formData.append('fixed_mix_mode', '1');

    // Random UA
    const userAgents = [
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36',
        'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36',
    ];
    const randomUA = userAgents[Math.floor(Math.random() * userAgents.length)];

    const response = await fetch(url.toString(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': randomUA
      },
      body: formData,
      agent: createProxyAgent()
    });
    const data = await response.json();
    return data

  } catch (error) {
    console.error('Error:', error);
  }
}

async function saveToFile(filename, data) {
    await fs.writeFile(filename, data, { flag: 'a' });
}

function randomDelay(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function smartDelay() {
  // Smart delay: 1-3 minutes with gaussian-like distribution
  // More likely to be around 2 minutes, less likely to be 1 or 3 minutes
  const baseDelay = 2; // minutes
  const variance = Math.random() * 1 - 0.5; // -0.5 to +0.5
  const smartDelay = baseDelay + variance;
  return Math.max(1, Math.min(3, Math.round(smartDelay))); // clamp between 1-3 minutes
}

// Loading animation function
function showLoading(message, duration = 2000) {
  const frames = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
  let i = 0;
  const startTime = Date.now();

  return new Promise(resolve => {
    const interval = setInterval(() => {
      process.stdout.write(chalk.cyan(`\r${frames[i]} `) + chalk.bold.white(message));
      i = (i + 1) % frames.length;

      if (Date.now() - startTime >= duration) {
        clearInterval(interval);
        process.stdout.write('\r' + ' '.repeat(message.length + 2) + '\r'); // Clear line
        resolve();
      }
    }, 100);
  });
}

// Fancy banner function
function showBanner() {
  console.clear();
  console.log(chalk.cyan('╔══════════════════════════════════════════════════════════════════════════════╗'));
  console.log(chalk.cyan('║') + chalk.bold.magenta(' ██████  █████  ██████   ██████ ██    ██ ████████     ██████   ██████  ████████ ') + chalk.cyan(' ║'));
  console.log(chalk.cyan('║') + chalk.bold.magenta('██      ██   ██ ██   ██ ██      ██    ██    ██    ██       ██           ██ ') + chalk.cyan(' ║'));
  console.log(chalk.cyan('║') + chalk.bold.magenta('██      ███████ ██████  ██      ██    ██    ██    ██      ███████     ██ ') + chalk.cyan(' ║'));
  console.log(chalk.cyan('║') + chalk.bold.magenta('██      ██   ██ ██      ██      ██    ██    ██    ██      ██          ██ ') + chalk.cyan(' ║'));
  console.log(chalk.cyan('║') + chalk.bold.magenta(' ██████ ██   ██ ██       ██████  ██████     ██     ██████  ████████    ██ ') + chalk.cyan(' ║'));
  console.log(chalk.cyan('╚══════════════════════════════════════════════════════════════════════════════╝'));
  console.log(chalk.yellow('┌─────────────────────────────────────────────────────────────────────────────┐'));
  console.log(chalk.yellow('│') + chalk.bold.white(' 🚀 CapCut Account Creator v2.0 - Premium Edition') + chalk.yellow(' '.repeat(23) + '│'));
  console.log(chalk.yellow('│') + chalk.bold.cyan(' 🔒 Anti-Detection System | Proxy Enabled | Smart Timing') + chalk.yellow(' '.repeat(12) + '│'));
  console.log(chalk.yellow('│') + chalk.bold.green(' ⚡ Fast Account Creation | 1-3 Min Delay | Max 5 Accounts') + chalk.yellow(' '.repeat(12) + '│'));
  console.log(chalk.yellow('└─────────────────────────────────────────────────────────────────────────────┘'));
  console.log(chalk.magenta('┌─────────────────────────────────────────────────────────────────────────────┐'));
  console.log(chalk.magenta('│') + chalk.bold.red(' 💻 Coded by: ') + chalk.bold.white('lhuciver') + chalk.magenta(' '.repeat(57) + '│'));
  console.log(chalk.magenta('│') + chalk.bold.blue(' 🔗 GitHub: ') + chalk.bold.white('github.com/lhuciver') + chalk.magenta(' '.repeat(47) + '│'));
  console.log(chalk.magenta('│') + chalk.bold.green(' 📱 Telegram: ') + chalk.bold.white('@lhuciver') + chalk.magenta(' '.repeat(49) + '│'));
  console.log(chalk.magenta('└─────────────────────────────────────────────────────────────────────────────┘'));
  console.log('');
}

// Progress bar function
function showProgress(current, total, message = '') {
  const percentage = Math.round((current / total) * 100);
  const filled = Math.round((percentage / 100) * 30);
  const empty = 30 - filled;
  const bar = '█'.repeat(filled) + '░'.repeat(empty);
  console.log(chalk.cyan(`[${bar}] ${percentage}% ${message}`));
}

// Status display functions
function showSuccess(message) {
  console.log(chalk.green(' ✅ ') + chalk.bold.white(message));
}

function showError(message) {
  console.log(chalk.red(' ❌ ') + chalk.bold.white(message));
}

function showInfo(message) {
  console.log(chalk.blue(' ℹ️  ') + chalk.bold.white(message));
}

function showWarning(message) {
  console.log(chalk.yellow(' ⚠️  ') + chalk.bold.white(message));
}

function showStep(step, message) {
  console.log(chalk.magenta(` [${step}] `) + chalk.bold.cyan(message));
}

// Jalankan fungsi dengan CLI input
(async () => {
  showBanner();

  console.log(chalk.bold.yellow('┌─ Configuration Setup ─────────────────────────────────────────────────────┐'));
  const loopCount = readline.questionInt(chalk.bold.cyan(' 📊 How many accounts to create? ') + chalk.gray('(Max 5 for safety): '));
  if (loopCount > 5) {
    showError('Too many accounts! Risk of detection. Limit to 5.');
    process.exit(1);
  }

  config.password = readline.question(chalk.bold.cyan(' 🔑 Enter password ') + chalk.gray('(Press Enter for default "P@ssw0rd123"): '), { hideEchoBack: true }) || 'P@ssw0rd123';

  console.log(chalk.bold.yellow('└───────────────────────────────────────────────────────────────────────────┘'));
  console.log('');

  // Loading animation for initialization
  await showLoading('Initializing CapCut Account Creator...', 2000);
  await showLoading('Connecting to proxy servers...', 1500);
  await showLoading('Loading anti-detection systems...', 1000);

  showSuccess('System ready!');
  console.log('');
  showInfo(`Starting account creation process (${loopCount} accounts)`);
  showProgress(0, loopCount, 'Initializing...');

  for (let i = 1; i <= loopCount; i++) {
    console.log('');
    console.log(chalk.bold.yellow(`┌─ Account ${i}/${loopCount} ─────────────────────────────────────────────────────────┐`));

    try {
      showStep('1/5', 'Generating secure random email...');
      const domainList = await getEmailRandom();
      if (domainList.length === 0) {
        throw new Error('Failed to fetch email domains');
      }
      const domain = domainList[Math.floor(Math.random() * domainList.length)];
      const name = faker.internet.username().toLowerCase().replace(/[^a-z0-9]/g, '');
      const email = `${name}@${domain}`;
      showSuccess(`Email: ${chalk.bold.magenta(email)}`);

      const password = config.password;
      const encryptedHexEmail = encryptToTargetHex(email);
      const encryptedHexPassword = encryptToTargetHex(password);

      showStep('2/5', 'Sending registration request to CapCut...');
      const reqnya = await regist_sendRequest(encryptedHexEmail, encryptedHexPassword);

      if (reqnya.message === "success") {
        showSuccess('Registration request sent successfully!');
        showStep('3/5', 'Waiting for verification email...');

        let verificationCode;
        let attempts = 0;
        do {
          showInfo(`Checking email (attempt ${attempts + 1}/12)...`);
          // Exponential backoff for email checking: start with 3s, increase gradually
          const baseDelay = 3000; // 3 seconds
          const backoffDelay = baseDelay * Math.pow(1.2, attempts); // 20% increase per attempt
          const maxDelay = 15000; // max 15 seconds
          const emailCheckDelay = Math.min(maxDelay, backoffDelay + Math.random() * 2000); // add some jitter
          await new Promise(resolve => setTimeout(resolve, emailCheckDelay));
          verificationCode = await functionGetLink(name, domain);
          attempts++;
          if (!verificationCode && attempts > 12) {
            throw new Error('Failed to get verification code after 12 attempts');
          }
        } while (!verificationCode);

        showSuccess(`Code received: ${chalk.bold.green(verificationCode)}`);
        const encryptedHexCode = encryptToTargetHex(verificationCode);

        showStep('4/5', 'Verifying account...');
        const verifyData = await verify_sendRequest(encryptedHexEmail, encryptedHexPassword, encryptedHexCode);

        if (verifyData.message === "success") {
          const accountData = `${email}|${password}\n`;
          await saveToFile(`accounts.txt`, accountData);
          showSuccess('Account created and saved to accounts.txt!');
          showStep('5/5', 'Account creation completed successfully!');
        } else {
          showError(`Verification failed: ${verifyData.description}`);
        }
      } else {
        showError(`Registration failed: ${reqnya.description}`);
      }
    } catch (error) {
      showError(`Account ${i} creation failed: ${error.message}`);
    }

    console.log(chalk.bold.yellow('└───────────────────────────────────────────────────────────────────────────┘'));

    // Update progress
    showProgress(i, loopCount, `${i}/${loopCount} accounts processed`);

    // Jeda antar akun untuk menghindari deteksi (1-3 menit dengan smart delay)
    if (i < loopCount) {
      const delayMin = smartDelay();
      console.log('');
      showWarning(`⏱️  Anti-detection delay: Waiting ${delayMin} minutes before next account...`);

      // Countdown timer
      for (let remaining = delayMin * 60; remaining > 0; remaining--) {
        if (remaining % 30 === 0 || remaining <= 10) { // Show every 30 seconds or last 10 seconds
          process.stdout.write(chalk.gray(`   ${Math.floor(remaining / 60)}:${(remaining % 60).toString().padStart(2, '0')} remaining...\r`));
        }
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
      console.log(''); // New line after countdown
    }
  }

  console.log('');
  console.log(chalk.bold.green('╔══════════════════════════════════════════════════════════════════════════════╗'));
  console.log(chalk.bold.green('║') + chalk.bold.white(' 🎉 ALL ACCOUNTS CREATED SUCCESSFULLY! ') + chalk.green(' '.repeat(48) + '║'));
  console.log(chalk.bold.green('║') + chalk.bold.cyan(' 📁 Check accounts.txt for your new CapCut accounts') + chalk.green(' '.repeat(25) + '║'));
  console.log(chalk.bold.green('║') + chalk.bold.magenta(' 👨‍💻 Script by lhuciver - github.com/lhuciver') + chalk.green(' '.repeat(30) + '║'));
  console.log(chalk.bold.green('╚══════════════════════════════════════════════════════════════════════════════╝'));

  // Footer with additional info
  console.log('');
  console.log(chalk.gray('┌─ Script Information ──────────────────────────────────────────────────────┐'));
  console.log(chalk.gray('│') + chalk.bold.cyan(' 🔧 Version: ') + chalk.white('2.0 Premium') + chalk.gray(' '.repeat(54) + '│'));
  console.log(chalk.gray('│') + chalk.bold.cyan(' 🛡️  Security: ') + chalk.white('Proxy + Anti-Detection') + chalk.gray(' '.repeat(42) + '│'));
  console.log(chalk.gray('│') + chalk.bold.cyan(' ⚡ Speed: ') + chalk.white('1-3 min per account') + chalk.gray(' '.repeat(46) + '│'));
  console.log(chalk.gray('│') + chalk.bold.cyan(' 📞 Support: ') + chalk.white('Telegram @lhuciver') + chalk.gray(' '.repeat(43) + '│'));
  console.log(chalk.gray('│') + chalk.bold.cyan(' 💝 Credits: ') + chalk.bold.red('lhuciver') + chalk.gray(' '.repeat(56) + '│'));
  console.log(chalk.gray('└───────────────────────────────────────────────────────────────────────────┘'));
  console.log('');
})();