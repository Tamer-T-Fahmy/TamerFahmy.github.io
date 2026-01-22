#!/bin/bash
# SSL Certificate Monitor for tamerfahmy.net
# This script checks the SSL certificate expiration date and sends a reminder
#
# Usage: Run monthly with cron:
# 0 9 1 * * /path/to/check-ssl-cert.sh
#
# Current certificate expires: Mar 20, 2026

DOMAIN="tamerfahmy.net"
WARN_DAYS=30
EMAIL="contact@tamerfahmy.net"

# Get certificate expiration date
EXPIRY_DATE=$(echo | openssl s_client -connect "$DOMAIN:443" -servername "$DOMAIN" 2>/dev/null | openssl x509 -noout -enddate 2>/dev/null | cut -d= -f2)

if [ -z "$EXPIRY_DATE" ]; then
    echo "ERROR: Could not retrieve certificate for $DOMAIN"
    exit 1
fi

# Convert to epoch
EXPIRY_EPOCH=$(date -j -f "%b %d %H:%M:%S %Y %Z" "$EXPIRY_DATE" +%s 2>/dev/null || date -d "$EXPIRY_DATE" +%s 2>/dev/null)
NOW_EPOCH=$(date +%s)

# Calculate days remaining
DAYS_REMAINING=$(( (EXPIRY_EPOCH - NOW_EPOCH) / 86400 ))

echo "=========================================="
echo "SSL Certificate Check for $DOMAIN"
echo "=========================================="
echo "Expiration Date: $EXPIRY_DATE"
echo "Days Remaining: $DAYS_REMAINING"
echo ""

if [ "$DAYS_REMAINING" -lt "$WARN_DAYS" ]; then
    echo "⚠️  WARNING: Certificate expires in less than $WARN_DAYS days!"
    echo ""
    echo "Action Required:"
    echo "  - GitHub Pages certificates auto-renew via Let's Encrypt"
    echo "  - If not renewed, check GitHub Pages settings"
    echo "  - Repository: https://github.com/Tamer-T-Fahmy/TamerFahmy.github.io"
    echo ""

    # Optional: Send email notification (uncomment if mail is configured)
    # echo "SSL certificate for $DOMAIN expires in $DAYS_REMAINING days!" | mail -s "SSL Certificate Warning: $DOMAIN" $EMAIL
else
    echo "✅ Certificate is valid for $DAYS_REMAINING more days."
fi

echo ""
echo "Note: GitHub Pages automatically renews Let's Encrypt certificates."
echo "Manual intervention is only needed if auto-renewal fails."
