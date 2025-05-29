import type { CardData } from '@/hooks/use-card-data';

export function generateVCard(data: CardData): string {
  const { fullName, jobTitle, bio, photoUrl, phone, email, website, linkedin, github, twitter } = data;

  // Basic structure
  let vCard = `BEGIN:VCARD\nVERSION:3.0\n`;

  // Name
  if (fullName) {
    const nameParts = fullName.split(' ');
    const lastName = nameParts.pop() || '';
    const firstName = nameParts.join(' ');
    vCard += `N:${lastName};${firstName}\n`;
    vCard += `FN:${fullName}\n`;
  }

  // Job Title and Organization (using job title for both for simplicity)
  if (jobTitle) {
    vCard += `TITLE:${jobTitle}\n`;
    vCard += `ORG:${jobTitle}\n`; // Or a separate company field if available
  }

  // Photo
  if (photoUrl) {
    // Check if it's a data URL or a regular URL
    if (photoUrl.startsWith('http')) {
       vCard += `PHOTO;VALUE=URL:${photoUrl}\n`;
    } else if (photoUrl.startsWith('data:image')) {
      // For base64, find appropriate type. Assuming JPEG or PNG.
      const mimeType = photoUrl.substring(photoUrl.indexOf(':') + 1, photoUrl.indexOf(';'));
      if (mimeType === 'image/jpeg' || mimeType === 'image/png') {
         vCard += `PHOTO;ENCODING=b;TYPE=${mimeType.split('/')[1].toUpperCase()}:${photoUrl.split(',')[1]}\n`;
      }
    }
  }
  
  // Phone
  if (phone) {
    vCard += `TEL;TYPE=CELL:${phone}\n`;
  }

  // Email
  if (email) {
    vCard += `EMAIL:${email}\n`;
  }

  // Website
  if (website) {
    vCard += `URL:${website}\n`;
  }
  
  // Social Media Links (using X-SOCIALPROFILE or URL)
  if (linkedin) {
    vCard += `X-SOCIALPROFILE;TYPE=linkedin:${linkedin}\n`;
    vCard += `URL;TYPE=linkedin:${linkedin}\n`; // Some apps might prefer generic URL
  }
  if (github) {
    vCard += `X-SOCIALPROFILE;TYPE=github:${github}\n`;
    vCard += `URL;TYPE=github:${github}\n`;
  }
  if (twitter) {
    vCard += `X-SOCIALPROFILE;TYPE=twitter:${twitter}\n`;
    vCard += `URL;TYPE=twitter:${twitter}\n`;
  }

  // Bio
  if (bio) {
    vCard += `NOTE:${bio.replace(/\n/g, '\\n')}\n`;
  }

  vCard += `END:VCARD`;
  return vCard;
}

export function downloadVCard(vCardString: string, filename: string = 'contact.vcf') {
  if (typeof window === 'undefined') return;
  const blob = new Blob([vCardString], { type: 'text/vcard;charset=utf-8;' });
  const link = document.createElement('a');
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
}
