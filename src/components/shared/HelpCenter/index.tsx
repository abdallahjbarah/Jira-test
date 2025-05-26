'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import FAQModal from '../FAQs';

const HelpCenterModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [showDetail, setShowDetail] = useState(true);
  const [showFullDetail, setShowFullDetail] = useState(false);
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showFAQModal, setShowFAQModal] = useState(false);
  const [tickets, setTickets] = useState<any[]>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('helpRequests');
      return stored ? JSON.parse(stored) : [];
    }
    return [];
  });
  const [selectedTicket, setSelectedTicket] = useState<any | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      const url = URL.createObjectURL(selectedFile);
      setFileUrl(url);
    }
  };

  const handleAttachClick = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject || !description) {
      alert('Please fill all fields.');
      return;
    }

    const newRequest = {
      subject,
      description,
      fileName: file ? file.name : null,
      fileUrl: fileUrl,
      date: new Date().toISOString(),
      status: 'In Review',
      statusColor: '#47C409',
      ref: Math.floor(1000000 + Math.random() * 9000000).toString(),
    };

    const updated = [newRequest, ...tickets];
    setTickets(updated);
    localStorage.setItem('helpRequests', JSON.stringify(updated));
    setSubject('');
    setDescription('');
    setFile(null);
    setFileUrl(null);
    setShowDetail(true);
  };

  const handleClose = () => {
    setShowDetail(true);
    setShowFullDetail(false);
    onClose();
  };

  const handleBack = () => {
    setShowFullDetail(false);
  };

  const handleFAQClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowFAQModal(true);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (!isOpen) return null;

  if (showFullDetail && selectedTicket) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div className="relative w-[573px] h-[762px]">
          <div className="absolute w-[573px] h-[762px] left-0 top-0 bg-white rounded-[10px] shadow-[0px_3px_20px_rgba(0,0,0,0.08)]">
            <div className="absolute top-10 left-1/2 transform -translate-x-1/2 w-[419px] flex flex-col items-center gap-5">
              <div className="absolute left-[-50px] top-0 w-6 h-6 flex items-center justify-center cursor-pointer" onClick={handleBack}>
                <Image src="/SVGs/shared/back-arrow.svg" alt="Back" width={24} height={24} />
              </div>
              <div className="w-[140px] font-bold text-xl leading-6 text-center text-[#222222]">Ref {selectedTicket.ref}</div>
              <div className="w-[312px] h-[1px] border border-solid border-[#EEEEEE]"></div>
            </div>

            <div className="absolute top-[120px] left-1/2 transform -translate-x-1/2 w-[515px] min-h-[285px] flex flex-col box-border">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 bg-[#F2F2F2] rounded-full flex items-center justify-center">
                  <Image src="/SVGs/shared/website-reply.svg" alt="Website Reply" width={40} height={40} />
                </div>
                <div className="flex items-center gap-2 text-sm leading-[17px] text-[#999999]">
                  <span className="text-[#222222]">Review status</span> • <span className="text-[#999999]">{formatDate(selectedTicket.date)}</span>
                </div>
              </div>

              <div className="relative ml-[19px] pl-[37px] border-l border-[#EEEEEE] -mt-1">
                <div className="font-semibold text-base leading-[19px] text-[#222222] mb-2">{selectedTicket.subject}</div>
                <div className="font-normal text-[17px] leading-5 text-[#999999] w-[459px] h-[100px] mb-2 overflow-auto">
                  {selectedTicket.description}
                </div>
                {selectedTicket.fileName && selectedTicket.fileUrl && (
                  <div
                    className="w-[105px] h-[151px] bg-gray-200 rounded-[16px] bg-cover bg-center bg-no-repeat flex-shrink-0"
                    style={{ backgroundImage: `url(${selectedTicket.fileUrl})` }}
                  />
                )}
              </div>
            </div>

            <div className="absolute top-[450px] left-1/2 transform -translate-x-1/2 w-[515px] h-[155px] py-6 px-6 box-border flex flex-col justify-start mt-[34px] ml-[19px] pl-[37px]">
              <div className="absolute left-[-19px] top-6 w-10 h-10 bg-[#F2F2F2] rounded-full flex items-center justify-center">
                <Image src="/SVGs/shared/website-reply.svg" alt="Website Reply" width={40} height={40} />
              </div>
              <div className="font-normal text-sm leading-[17px] text-[#999999] mb-2">
                <span className="text-[#222222]">Review status</span> • <span className="text-[#999999]">{formatDate(selectedTicket.date)}</span>
              </div>
              <div className="font-semibold text-base leading-[19px] text-[#222222] mb-2">Website Reply</div>
              <div className="font-normal text-[17px] leading-5 text-[#999999] w-[462px] h-[100px] overflow-auto">
                Thank you for your message. We have received your request and will get back to you soon.
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (showDetail) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div className="relative w-[566px] h-[761px]">
          <div className="absolute w-[566px] h-[761px] left-0 top-0 bg-white rounded-[10px] shadow-[0px_3px_20px_rgba(0,0,0,0.08)] flex flex-col items-center overflow-hidden">
            <button
              className="absolute left-[94.7%] right-[1.59%] top-[1.71%] bottom-[95.5%] bg-none border-none cursor-pointer w-[21px] h-[21px] flex items-center justify-center"
              onClick={handleClose}
              aria-label="Close"
            >
              <Image src="/SVGs/shared/close-icon.svg" alt="Close" width={24} height={24} />
            </button>

            <div className="absolute w-[312px] top-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
              <div className="w-[140px] font-bold text-xl leading-6 text-center text-[#222222] mb-5 whitespace-nowrap">Help Center</div>
              <div className="w-[312px] h-[1px] border border-solid border-[#EEEEEE]"></div>
            </div>

            <div className="w-full flex-1 overflow-y-auto flex flex-col items-center gap-6 mt-[110px] mb-[140px] max-h-[550px] py-5">
              {tickets.map((ticket, index) => (
                <div
                  key={ticket.ref}
                  className={`w-[488px] h-[143px] bg-white ${index === 0 ? 'shadow-[0px_4px_4px_rgba(0,0,0,0.25)]' : 'shadow-[0px_3px_20px_rgba(0,0,0,0.08)]'} rounded-[16px] p-6 flex flex-col justify-start box-border cursor-pointer mb-0 relative border-[0.5px] border-solid border-[#EEEEEE]`}
                  onClick={() => { setSelectedTicket(ticket); setShowFullDetail(true); }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-normal text-sm leading-[17px] text-[#47C409]">{ticket.status || 'In Review'}</span>
                    <span className="text-[#888]">•</span>
                    <span className="font-normal text-sm leading-[17px] text-[#888]">{formatDate(ticket.date)}</span>
                  </div>
                  <div className="font-semibold text-sm leading-[17px] text-[#222222] mb-2">{ticket.subject}</div>
                  <div className="font-normal text-sm leading-[17px] text-[#999999] w-[437.95px] h-[34px] mb-2 overflow-hidden text-ellipsis whitespace-nowrap">
                    {ticket.description}
                  </div>
                  <div className="font-normal text-xs leading-[14px] text-[#999999] mt-auto">Ref {ticket.ref}</div>
                </div>
              ))}
            </div>

            <div className="absolute left-1/2 transform -translate-x-1/2 top-[655px] flex gap-4 bg-white py-5">
              <button
                className="w-[127.42px] h-12 bg-[#47C409] shadow-[0px_10px_40px_rgba(71,196,9,0.25)] rounded-lg border-none text-white font-bold text-lg leading-[22px] text-center cursor-pointer flex items-center justify-center"
                onClick={() => setShowDetail(false)}
              >
                <span className="absolute w-[127.42px] h-[22px] font-bold text-lg leading-[22px] text-center text-white">Need Help</span>
              </button>
              <button className="w-[127.42px] h-12 bg-[#47C409] shadow-[0px_10px_40px_rgba(71,196,9,0.25)] rounded-lg border-none text-white font-bold text-lg leading-[22px] text-center cursor-pointer flex items-center justify-center">
                <span className="absolute w-[127.42px] h-[22px] font-bold text-lg leading-[22px] text-center text-white">Contact Us</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="relative w-[586px] h-[781px] flex flex-row items-center p-2.5 gap-2.5 bg-transparent">
        <div className="relative w-[566px] h-[761px] bg-white rounded-[10px] shadow-[0px_3px_20px_rgba(0,0,0,0.08)] flex flex-col items-center justify-end">
          <button
            className="absolute left-[94.7%] right-[1.59%] top-[1.71%] bottom-[95.5%] bg-none border-none cursor-pointer w-[21px] h-[21px] flex items-center justify-center"
            onClick={handleClose}
            aria-label="Close"
          >
            <Image src="/SVGs/shared/close-icon.svg" alt="Close" width={24} height={24} />
          </button>

          <form onSubmit={handleSubmit}>
            <div className="absolute top-10 left-1/2 transform -translate-x-1/2 w-[312px] h-12 flex flex-col items-center">
              <div className="w-[110px] h-6 font-bold text-xl leading-6 text-center text-[#222222] mx-auto mb-5 whitespace-nowrap">Help Center</div>
              <div className="w-[312px] h-[1px] border border-solid border-[#EEEEEE]"></div>
            </div>

            <div className="absolute top-[120px] left-1/2 transform -translate-x-1/2 w-[296px] h-[54px] flex flex-col items-center">
              <div className="w-[121px] h-[29px] font-bold text-2xl leading-[29px] text-center text-[#222222] mx-auto mb-1 whitespace-nowrap">Need help?</div>
              <div className="w-[296px] h-[17px] font-normal text-sm leading-[17px] text-center text-[#222222]">
                Send us a message and we'll get back to you!
              </div>
            </div>

            <div className="absolute top-[240px] left-1/2 transform -translate-x-1/2 w-[456px] h-[58.94px]">
              <input
                className="w-[456px] h-[58.94px] bg-white border border-[#EEEEEE] rounded-lg font-normal text-sm leading-[17px] text-[#555555] p-[18px_24px] box-border focus:outline-none focus:border-[#47C409] placeholder:absolute placeholder:h-[20.88px] placeholder:font-normal placeholder:text-sm placeholder:leading-[17px] placeholder:text-[#555555]"
                placeholder="Subject"
                value={subject}
                onChange={e => setSubject(e.target.value)}
              />
            </div>

            <div className="absolute top-[320px] left-1/2 transform -translate-x-1/2 w-[456px] h-[176.82px]">
              <textarea
                className="w-[456px] h-[176.82px] bg-white border border-[#EEEEEE] rounded-lg font-normal text-sm leading-[17px] text-[#555555] p-[18px_24px] box-border resize-none focus:outline-none focus:border-[#47C409] placeholder:absolute placeholder:h-[20.88px] placeholder:font-normal placeholder:text-sm placeholder:leading-[17px] placeholder:text-[#555555] placeholder:top-[18px]"
                placeholder="Type your message here!"
                value={description}
                onChange={e => setDescription(e.target.value)}
              />
            </div>

            <div className="absolute top-[520px] left-1/2 transform -translate-x-1/2 w-[456px] h-[58.94px] flex items-center">
              <input
                className="absolute w-[456px] h-[58.94px] bg-white border border-[#EEEEEE] rounded-lg font-normal text-sm leading-[17px] text-[#555555] p-[18px_24px] box-border cursor-pointer text-left focus:outline-none focus:border-[#47C409] placeholder:absolute placeholder:h-[20.88px] placeholder:font-normal placeholder:text-sm placeholder:leading-[17px] placeholder:text-[#555555]"
                placeholder={file ? file.name : 'Attach file / Screenshot'}
                readOnly
                onClick={handleAttachClick}
              />
              <div
                className="absolute right-[2.52%] w-[23px] h-[29px] flex items-center justify-center cursor-pointer z-10"
                onClick={handleAttachClick}
              >
                <Image src="/SVGs/shared/Attach.svg" alt="Attach file" width={23} height={29} />
              </div>
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                onChange={handleFileChange}
                accept="image/*,application/pdf"
              />
            </div>

            <button
              type="submit"
              className="absolute left-[194px] top-[644px] w-[179px] h-12 bg-[#47C409] shadow-[0px_10px_40px_rgba(71,196,9,0.25)] rounded-lg border-none text-white font-bold text-xl leading-6 text-center cursor-pointer"
            >
              Search
            </button>

            <div className="absolute left-[36.75%] right-[35.51%] top-[94.09%] bottom-[4.07%] font-normal text-xs leading-[14px] text-center text-[#222222]">
              You can also check our{' '}
              <a
                className="text-[#47C409] no-underline cursor-pointer hover:underline"
                onClick={handleFAQClick}
              >
                FAQs
              </a>
            </div>
          </form>
        </div>
      </div>

      {showFAQModal && (
        <FAQModal isOpen={showFAQModal} onClose={() => setShowFAQModal(false)} />
      )}
    </div>
  );
};

export default HelpCenterModal;