export const El = ({ element, child, eventL ,restAttrs = {}, ...rest }) => {
  const el = document.createElement(element);
  for (const key in rest) {
    el[key] = rest[key];
  }

  for (const key in restAttrs) {
    el.setAttribute(key, restAttrs[key]);
  }

  if (child) Array.isArray(child) ? el.append(...child) : el.append(child);
  if(eventL){
    eventL.map(item=>el.addEventListener(item.event,item.callback))
    
  }
  return el;
};
