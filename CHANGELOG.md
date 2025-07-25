# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]
- Initial creation of CHANGELOG.md to track all future changes. 
- Updated ticket prices in the ticket cards from dollar ($) to Ghanaian cedi (GH₵) symbol.
- Integrated Paystack payment in the ticket modal, allowing users to pay for tickets using Paystack.
- Switched Paystack public key to the provided test key (pk_test_11bf9e6adfb3029be6792c5af6918cb85b42dbb4) and fixed TypeScript linter errors for Paystack integration. 
- Set up Supabase integration to store ticket purchases.
- Created a receipt page that displays ticket details, generates a QR code, and allows users to download a PDF version of their ticket.
- Added .env setup instructions for Supabase credentials. 