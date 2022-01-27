import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDropzone } from 'react-dropzone';
import { RotateCcw, RotateCw, X } from 'react-feather';
import Draggable from 'react-draggable';
import { v4 as uuidv4 } from 'uuid';

const Wrapper = styled.div`
  & *::-webkit-scrollbar {
    height: 12px;
    width: 12px;
    background: transparent;
  }

  & *::-webkit-scrollbar-thumb {
    border-radius: 10px;
    cursor: pointer;
    width: 12px;
    border: 3px solid hsla(0, 0%, 100%, 0);
    background-clip: padding-box;
    background-color: rgba(53, 65, 76, 0.3);
  }

  & *::-webkit-scrollbar-thumb:hover {
    background-color: rgba(45, 70, 104, 0.4);
    cursor: pointer;
  }
`;

const Dropzone = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  height: 10rem;
  border-width: 2px;
  border-radius: 2px;
  border-color: #eeeeee;
  border-style: dashed;
  background-color: #fafafa;
  color: #bdbdbd;
  outline: none;
  transition: border 0.24s ease-in-out;

  &:focus,
  &.drag-active {
    border-color: #2196f3;
  }

  &.disabled {
    cursor: wait;
  }
`;

const UploadedPages = styled.div`
  position: relative;
  user-select: none;
  overflow-x: scroll;
  overflow-y: hidden;
`;

const UploadedPagesInner = styled.div`
  height: 100%;
  position: relative;
`;

const UploadedPage = styled.div`
  height: fit-content;
  margin-top: auto;
`;

const UploadedPageInner = styled.div`
  position: relative;
  width: fit-content;
  height: fit-content;
`;

const UploadedPageOuter = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;

  &.dragging {
    z-index: 1000;
  }

  &:not(.dragging) {
    transition: transform 0.3s;
  }

  &.dragging > div {
    transform: scale(1.1);
    opacity: 0.9;
  }

  &.last-dragged {
    z-index: 999;
  }

  &.disappeared > div {
    transform: scale(0);
    opacity: 0;
  }
`;

const UploadedPageOuter2 = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  transition: transform 0.3s, opacity 0.25s;
`;

const PageRemoveButton = styled.div`
  position: absolute;
  top: -0.4rem;
  right: -0.4rem;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 100%;
  background-color: rgb(207, 49, 57);
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background-color 0.3s;
  cursor: pointer;

  &:hover {
    background-color: rgb(166, 39, 45);
  }
`;

const PreviewControls = styled.div`
  width: 100%;
  margin-top: auto;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const RotateButton = styled.div`
  cursor: pointer;
`;

const PreviewImgContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  transition: width 0.3s, height 0.3s;
`;

const PreviewImg = styled.img`
  transition: box-shadow 0.3s, filter 0.3s, transform 0.3s, width 0.3s, height 0.3s;
  box-shadow: 0 0 0.8rem rgba(0, 0, 0, 0.1);

  &:hover {
    box-shadow: 0 0 1rem rgba(0, 0, 0, 0.1);
    filter: brightness(105%);
  }
`;

const UploadedPagesInteractionBlocker = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: white;
  opacity: 0;
  cursor: wait;
  z-index: 10000;
`;

function readFileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      resolve(reader.result.split(',')[1]);
    };
    reader.onerror = error => {
      reject(error);
    };
  });
}

function getPageRotation(buildPdfData, pageOrIdx) {
  if (typeof pageOrIdx === 'number') pageOrIdx = buildPdfData.pages[pageOrIdx];
  return (pageOrIdx.modifications ?? []).filter(m => m.type === 'rotate').reduce((sum, m) => sum + m.degrees, 0);
}

function getPageDimensions(buildPdfData, pageOrIdx) {
  if (typeof pageOrIdx === 'number') pageOrIdx = buildPdfData.pages[pageOrIdx];
  const rotation = getPageRotation(buildPdfData, pageOrIdx);
  return {
    ...buildPdfData.files[pageOrIdx.origin.file].previews[pageOrIdx.origin.page].dimensions,
    isRotated: rotation % 180 !== 0,
    rotation,
  };
}

function getMaxPreviewHeight(buildPdfData) {
  return Math.max(
    ...buildPdfData.pages.map(p => {
      const dims = getPageDimensions(buildPdfData, p);
      return dims.isRotated ? dims.width : dims.height;
    }),
  );
}

function calculatePreviewDimensions(buildPdfData, previewAreaHeight) {
  const maxPreviewHeight = getMaxPreviewHeight(buildPdfData);

  return buildPdfData.pages.map(p => {
    const pageDims = getPageDimensions(buildPdfData, p);
    const height = (pageDims.height / maxPreviewHeight) * previewAreaHeight;
    const width = (pageDims.width / pageDims.height) * height;

    return {
      isRotated: pageDims.isRotated,
      rotation: pageDims.rotation,
      unrotatedWidth: width,
      unrotatedHeight: height,
      width: pageDims.isRotated ? height : width,
      height: pageDims.isRotated ? width : height,
    };
  });
}

function calculatePreviewPosition(previewDimensions, pageIdx, previewSpacing) {
  let x = 0;

  for (let i = 0; i < pageIdx; i++) {
    x += previewDimensions[i].width;
    x += previewSpacing;
  }

  return { x, y: 0 };
}

export default ({
  components,
  finalizeButton,
  loadPreviews,
  buildPdf,
  previewResolution = 100,
  previewAreaHeight = 240,
  previewAreaPadding = 16,
  previewSpacing = 24,
  previewControlsHeight = 40,
  showPreviewAreaWhenEmpty = false,
}) => {
  const scrollbarHeight = 12;
  const actualPreviewAreaHeight = previewAreaHeight - previewAreaPadding * 2 - previewControlsHeight;
  const [buildPdfData, setBuildPdfData] = useState({ files: [], pages: [] });

  const [previewsLoading, setPreviewsLoading] = useState(false);
  const [buildPdfLoading, setBuildPdfLoading] = useState(false);
  const [pageIdDragging, setPageIdDragging] = useState(undefined);
  const [lastPageIdDragged, setLastPageIdDragged] = useState(undefined);

  const onDrop = useCallback(
    async acceptedFiles => {
      setPreviewsLoading(true);
      const newFiles = [...buildPdfData.files];
      const newPages = [...buildPdfData.pages];

      for (let fileIdx = 0; fileIdx < acceptedFiles.length; fileIdx++) {
        const file = acceptedFiles[fileIdx];
        const fileBase64 = await readFileToBase64(file);

        const previews = (await loadPreviews({ file: fileBase64, resolution: previewResolution })).pages;
        if (previews) {
          newFiles.push({ pdf: fileBase64, previews });
          for (let pageIdx = 0; pageIdx < previews.length; pageIdx++) {
            newPages.push({
              id: uuidv4(),
              origin: { file: buildPdfData.files.length + fileIdx, page: pageIdx },
              modifications: [],
              position: { x: 0, y: 0 },
              disappeared: true,
            });
          }
        }
      }

      const newBuildPdfData = { files: newFiles, pages: newPages };
      const previewDimensions = calculatePreviewDimensions(newBuildPdfData, actualPreviewAreaHeight);
      for (let i = 0; i < newPages.length; i++) {
        newPages[i].position = calculatePreviewPosition(previewDimensions, i, previewSpacing);
      }

      setBuildPdfData(newBuildPdfData);
      setTimeout(() => {
        setBuildPdfData({ files: newFiles, pages: newPages.map(p => ({ ...p, disappeared: false })) });
        setPreviewsLoading(false);
      }, 10);
    },
    [buildPdfData, loadPreviews, previewResolution, actualPreviewAreaHeight, previewSpacing],
  );

  const { isDragActive, getRootProps, getInputProps } = useDropzone({
    accept: 'application/pdf',
    disabled: previewsLoading || buildPdfLoading,
    onDrop,
  });

  const calculatedPreviewDimensions = calculatePreviewDimensions(buildPdfData, actualPreviewAreaHeight);
  const calculatedPreviewPositions = buildPdfData.pages.map((_, pageIdx) =>
    calculatePreviewPosition(calculatedPreviewDimensions, pageIdx, previewSpacing),
  );
  const calculatedPreviewMidpoints = buildPdfData.pages.map(
    (_, pageIdx) => calculatedPreviewPositions[pageIdx].x + calculatedPreviewDimensions[pageIdx].width / 2,
  );

  const addPageModification = (pageIdx, mod) => {
    setBuildPdfData({
      files: buildPdfData.files,
      pages: buildPdfData.pages.map((p, i) => (i === pageIdx ? { ...p, modifications: [...p.modifications, mod] } : p)),
    });
  };

  const PageNumber = components.pageNumber ?? (() => null);

  const onBuildPdf = useCallback(async () => {
    if (buildPdfLoading) return;
    setBuildPdfLoading(true);
    await buildPdf({
      files: buildPdfData.files.map(f => f.pdf),
      pages: buildPdfData.pages.map(p => ({ origin: p.origin, modifications: p.modifications })),
    });
    setBuildPdfLoading(false);
  }, [buildPdf, buildPdfData, buildPdfLoading]);

  // handle finalize button
  useEffect(() => {
    const btn = finalizeButton.ref?.current;
    if (btn) {
      btn.addEventListener('click', onBuildPdf);
      return () => {
        btn.removeEventListener('click', onBuildPdf);
      };
    }
  }, [finalizeButton.ref, onBuildPdf]);

  useEffect(() => {
    if (finalizeButton.setLoading) {
      finalizeButton.setLoading(buildPdfLoading);
    }
  }, [finalizeButton.setLoading, buildPdfLoading]);

  useEffect(() => {
    if (finalizeButton.setDisabled) {
      finalizeButton.setDisabled(buildPdfData.pages.length === 0);
    }
  }, [finalizeButton.setDisabled, buildPdfData.pages.length]);

  return (
    <Wrapper>
      <Dropzone
        {...getRootProps({
          className: (previewsLoading || buildPdfLoading ? 'disabled' : '') + (isDragActive ? ' drag-active' : ''),
        })}
      >
        <input {...getInputProps()} />
        {previewsLoading ? components.loading ?? null : components.dropzonePlaceholder ?? null}
      </Dropzone>
      {showPreviewAreaWhenEmpty || buildPdfData.pages.length > 0 ? components.uploadedPagesHeading ?? null : null}
      {showPreviewAreaWhenEmpty || buildPdfData.pages.length > 0 ? (
        <UploadedPages
          style={{
            height: previewAreaHeight + 'px',
            padding: `${previewAreaPadding}px ${previewAreaPadding}px ${
              previewAreaPadding - scrollbarHeight
            }px ${previewAreaPadding}px`,
          }}
        >
          <UploadedPagesInner>
            {buildPdfData.pages.map((page, pageIdx) => {
              const preview = buildPdfData.files[page.origin.file].previews[page.origin.page];
              const calculatedPosition = calculatedPreviewPositions[pageIdx];
              const calculatedDimensions = calculatedPreviewDimensions[pageIdx];

              return (
                <Draggable
                  key={JSON.stringify(page.origin)}
                  axis="x"
                  position={pageIdDragging === page.id ? page.position : calculatedPosition}
                  onDrag={(e, position) => {
                    const newPosition = { x: position.x, y: calculatedPosition.y };
                    const newMidpoint = position.x + calculatedDimensions.width / 2;
                    const newPages = buildPdfData.pages.map((p, i) =>
                      i === pageIdx ? { ...p, position: newPosition } : p,
                    );

                    // look for the leftmost preview whose midpoint has been exceeded while moving to the left hand side
                    let draggedPage = false;
                    for (let i = 0; i < pageIdx; i++) {
                      if (calculatedPreviewMidpoints[i] > newMidpoint) {
                        const [currentPage] = newPages.splice(pageIdx, 1);
                        newPages.splice(i, 0, currentPage);
                        draggedPage = true;
                        break;
                      }
                    }

                    // if no such preview was found, look for the rightmost one
                    if (!draggedPage) {
                      for (let i = buildPdfData.pages.length - 1; i > pageIdx; i--) {
                        if (calculatedPreviewMidpoints[i] < newMidpoint) {
                          const [currentPage] = newPages.splice(pageIdx, 1);
                          newPages.splice(i, 0, currentPage);
                          break;
                        }
                      }
                    }

                    setBuildPdfData({
                      files: buildPdfData.files,
                      pages: newPages,
                    });
                  }}
                  onStart={() => {
                    setBuildPdfData({
                      files: buildPdfData.files,
                      pages: buildPdfData.pages.map((p, i) =>
                        i === pageIdx ? { ...p, position: calculatedPosition } : p,
                      ),
                    });
                    setPageIdDragging(page.id);
                  }}
                  onStop={() => {
                    setPageIdDragging(undefined);
                    setLastPageIdDragged(page.id);
                  }}
                >
                  <UploadedPageOuter
                    className={
                      (pageIdDragging === page.id ? 'dragging' : '') +
                      ' ' +
                      (lastPageIdDragged === page.id ? 'last-dragged' : '') +
                      ' ' +
                      (page.disappeared ? 'disappeared' : '')
                    }
                  >
                    <UploadedPageOuter2>
                      <UploadedPage
                        style={{
                          cursor: pageIdDragging === page.id ? 'move' : 'auto',
                        }}
                      >
                        <UploadedPageInner>
                          <PreviewImgContainer
                            style={{
                              width: calculatedDimensions.width + 'px',
                              height: calculatedDimensions.height + 'px',
                            }}
                          >
                            <PreviewImg
                              alt=""
                              src={preview.uri}
                              style={{
                                width: calculatedDimensions.unrotatedWidth + 'px',
                                height: calculatedDimensions.unrotatedHeight + 'px',
                                transform: `rotate(${calculatedDimensions.rotation}deg)`,
                              }}
                              draggable="false"
                              onDragStart={e => e.preventDefault()}
                            />
                          </PreviewImgContainer>

                          <PageRemoveButton
                            onMouseDown={e => e.stopPropagation()}
                            onClick={() => {
                              setBuildPdfData({
                                files: buildPdfData.files,
                                pages: buildPdfData.pages.map((p, i) =>
                                  i === pageIdx ? { ...p, disappeared: true } : p,
                                ),
                              });

                              setTimeout(
                                () =>
                                  setBuildPdfData({
                                    files: buildPdfData.files,
                                    pages: buildPdfData.pages.filter((_, i) => i !== pageIdx),
                                  }),
                                300,
                              );
                            }}
                          >
                            <X color="white" size="1rem" />
                          </PageRemoveButton>
                        </UploadedPageInner>
                      </UploadedPage>

                      <PreviewControls
                        style={{
                          height: previewControlsHeight + 'px',
                        }}
                      >
                        <RotateButton
                          onMouseDown={e => e.stopPropagation()}
                          onClick={() => addPageModification(pageIdx, { type: 'rotate', degrees: -90 })}
                        >
                          <RotateCcw color="#888" size="0.8rem" />
                        </RotateButton>
                        <span style={{ margin: '0 1rem' }}>
                          <PageNumber n={pageIdx + 1} />
                        </span>
                        <RotateButton
                          onMouseDown={e => e.stopPropagation()}
                          onClick={() => addPageModification(pageIdx, { type: 'rotate', degrees: 90 })}
                        >
                          <RotateCw color="#888" size="0.8rem" />
                        </RotateButton>
                      </PreviewControls>
                    </UploadedPageOuter2>
                  </UploadedPageOuter>
                </Draggable>
              );
            })}
          </UploadedPagesInner>
          {previewsLoading || buildPdfLoading ? <UploadedPagesInteractionBlocker /> : null}
        </UploadedPages>
      ) : null}
    </Wrapper>
  );
};
